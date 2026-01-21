import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as cors from 'cors'
import * as express from 'express'
import { generatePDF } from './exportGenerator'
import { generateAnalytics } from './surveyAnalytics'

admin.initializeApp()

const app = express()
const corsHandler = cors({ origin: true })

// Analytics endpoint
app.post('/analytics/:surveyId', async (req, res) => {
  try {
    const { surveyId } = req.params
    const analytics = await generateAnalytics(surveyId)
    res.json(analytics)
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate analytics' })
  }
})

// Export endpoints
app.post('/export/pdf/:surveyId', async (req, res) => {
  try {
    const { surveyId } = req.params
    const { includeCharts = true } = req.body
    
    const pdfBuffer = await generatePDF(surveyId, { includeCharts })
    
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="survey-${surveyId}.pdf"`)
    res.send(pdfBuffer)
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate PDF' })
  }
})

// Firebase Functions
export const onSurveyResponse = functions.firestore
  .document('responses/{responseId}')
  .onCreate(async (snapshot, context) => {
    const response = snapshot.data()
    const surveyId = response.surveyId
    
    // Update response count
    const surveyRef = admin.firestore().collection('surveys').doc(surveyId)
    await surveyRef.update({
      responseCount: admin.firestore.FieldValue.increment(1),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    })
    
    // Update analytics cache
    await updateAnalyticsCache(surveyId)
  })

export const api = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => app(req, res))
})

async function updateAnalyticsCache(surveyId: string) {
  const analyticsRef = admin.firestore().collection('analytics').doc(surveyId)
  
  // Generate fresh analytics
  const analytics = await generateAnalytics(surveyId)
  
  // Store in cache
  await analyticsRef.set({
    ...analytics,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true })
}
