import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import Layout from './components/layout/Layout'

// Páginas
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import SurveyCreatorPage from './pages/SurveyCreator/SurveyCreatorPage'
import SurveyResponderPage from './pages/SurveyResponder/SurveyResponderPage'
import SurveyAnalyticsPage from './pages/Analytics/SurveyAnalyticsPage'
import TemplatesPage from './pages/Templates/TemplatesPage'

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/respond/:surveyId" element={<SurveyResponderPage />} />
          
          {/* Rotas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create" element={<SurveyCreatorPage />} />
            <Route path="/create/:templateId" element={<SurveyCreatorPage />} />
            <Route path="/survey/:surveyId" element={<SurveyAnalyticsPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App
