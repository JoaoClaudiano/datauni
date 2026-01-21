import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore'
import { db } from '../services/firebase/config'
import { Survey, Question, SurveySettings } from '../types/survey'

interface SurveyStore {
  // State
  title: string
  description: string
  questions: Question[]
  settings: SurveySettings
  currentSurveyId: string | null
  
  // Actions
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  addQuestion: (question: Question) => void
  updateQuestion: (id: string, updates: Partial<Question>) => void
  deleteQuestion: (id: string) => void
  reorderQuestions: (fromId: string, toId: string) => void
  setSettings: (settings: Partial<SurveySettings>) => void
  loadSurvey: (survey: Survey) => void
  clearSurvey: () => void
  
  // Firebase actions
  saveSurvey: (surveyData?: Partial<Survey>) => Promise<string>
  publishSurvey: (surveyId: string) => Promise<void>
}

export const useSurveyStore = create<SurveyStore>()(
  persist(
    (set, get) => ({
      // Initial state
      title: '',
      description: '',
      questions: [],
      settings: {
        allowAnonymous: true,
        showProgress: true,
        oneQuestionPerPage: true,
        requireLogin: false,
        randomizeQuestions: false,
        startDate: null,
        endDate: null,
        maxResponses: null
      },
      currentSurveyId: null,

      // Actions
      setTitle: (title) => set({ title }),
      setDescription: (description) => set({ description }),
      
      addQuestion: (question) => 
        set((state) => ({ 
          questions: [...state.questions, question] 
        })),
      
      updateQuestion: (id, updates) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === id ? { ...q, ...updates } : q
          )
        })),
      
      deleteQuestion: (id) =>
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id)
        })),
      
      reorderQuestions: (fromId, toId) => {
        set((state) => {
          const questions = [...state.questions]
          const fromIndex = questions.findIndex((q) => q.id === fromId)
          const toIndex = questions.findIndex((q) => q.id === toId)
          
          if (fromIndex === -1 || toIndex === -1) return state
          
          const [movedQuestion] = questions.splice(fromIndex, 1)
          questions.splice(toIndex, 0, movedQuestion)
          
          return { questions }
        })
      },
      
      setSettings: (settings) =>
        set((state) => ({ 
          settings: { ...state.settings, ...settings } 
        })),
      
      loadSurvey: (survey) =>
        set({
          title: survey.title,
          description: survey.description,
          questions: survey.questions,
          settings: survey.settings,
          currentSurveyId: survey.id
        }),
      
      clearSurvey: () =>
        set({
          title: '',
          description: '',
          questions: [],
          settings: {
            allowAnonymous: true,
            showProgress: true,
            oneQuestionPerPage: true,
            requireLogin: false,
            randomizeQuestions: false,
            startDate: null,
            endDate: null,
            maxResponses: null
          },
          currentSurveyId: null
        }),

      // Firebase actions
      saveSurvey: async (surveyData) => {
        const state = get()
        const userId = auth.currentUser?.uid
        
        if (!userId) {
          throw new Error('Usuário não autenticado')
        }

        const surveyDoc = {
          title: surveyData?.title || state.title,
          description: surveyData?.description || state.description,
          questions: surveyData?.questions || state.questions,
          settings: surveyData?.settings || state.settings,
          userId,
          status: 'draft',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          responseCount: 0
        }

        try {
          let surveyId = state.currentSurveyId
          
          if (surveyId) {
            // Update existing survey
            await updateDoc(doc(db, 'surveys', surveyId), surveyDoc)
          } else {
            // Create new survey
            const docRef = await addDoc(collection(db, 'surveys'), surveyDoc)
            surveyId = docRef.id
            set({ currentSurveyId: surveyId })
          }

          return surveyId
        } catch (error) {
          console.error('Error saving survey:', error)
          throw error
        }
      },

      publishSurvey: async (surveyId: string) => {
        try {
          await updateDoc(doc(db, 'surveys', surveyId), {
            status: 'published',
            publishedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          })
        } catch (error) {
          console.error('Error publishing survey:', error)
          throw error
        }
      }
    }),
    {
      name: 'survey-storage',
      partialize: (state) => ({
        title: state.title,
        description: state.description,
        questions: state.questions,
        settings: state.settings,
        currentSurveyId: state.currentSurveyId
      })
    }
  )
)
