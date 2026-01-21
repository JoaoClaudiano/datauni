export type QuestionType = 
  | 'multiple_choice'
  | 'text'
  | 'scale'
  | 'yes_no'
  | 'rating'
  | 'dropdown'
  | 'date'
  | 'time'

export interface QuestionOption {
  id: string
  label: string
  value: string
  imageUrl?: string
}

export interface ScaleConfig {
  min: number
  max: number
  step?: number
  labels?: {
    [key: number]: string
  }
}

export interface Question {
  id: string
  type: QuestionType
  title: string
  description?: string
  required: boolean
  options?: QuestionOption[]
  scale?: ScaleConfig
  placeholder?: string
  maxLength?: number
  min?: number
  max?: number
  pattern?: string
  validationMessage?: string
}

export interface SurveySettings {
  allowAnonymous: boolean
  showProgress: boolean
  oneQuestionPerPage: boolean
  requireLogin: boolean
  randomizeQuestions: boolean
  startDate: Date | null
  endDate: Date | null
  maxResponses: number | null
  theme?: {
    primaryColor: string
    backgroundColor: string
    fontFamily: string
  }
}

export interface Survey {
  id: string
  title: string
  description: string
  questions: Question[]
  settings: SurveySettings
  userId: string
  status: 'draft' | 'published' | 'closed'
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  responseCount: number
  tags?: string[]
  category?: string
}

export interface SurveyResponse {
  id: string
  surveyId: string
  answers: {
    [questionId: string]: any
  }
  metadata: {
    userAgent: string
    ipAddress?: string
    location?: {
      latitude: number
      longitude: number
    }
    duration: number // seconds
    deviceType: 'mobile' | 'tablet' | 'desktop'
  }
  submittedAt: Date
  userId?: string
  anonymousId?: string
}

export interface AnalyticsData {
  totalResponses: number
  completionRate: number
  averageDuration: number
  deviceBreakdown: {
    mobile: number
    tablet: number
    desktop: number
  }
  questionAnalytics: {
    [questionId: string]: {
      type: QuestionType
      totalAnswers: number
      data: any // Specific to question type
    }
  }
  timeSeries: {
    date: string
    count: number
  }[]
}

export interface AcademicTemplate {
  id: string
  title: string
  description: string
  category: 'evaluation' | 'research' | 'feedback' | 'assessment'
  questions: Question[]
  tags: string[]
  usageCount: number
  createdAt: Date
  createdBy: string
  institution?: string
  license: 'open' | 'creative-commons' | 'restricted'
}
