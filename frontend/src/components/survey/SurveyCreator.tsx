import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { toast } from 'react-hot-toast'
import { Save, Plus, Trash2, Eye, Share2 } from 'lucide-react'
import { useSurveyStore } from '../../stores/surveyStore'
import QuestionCard from './QuestionCard'
import SurveyPreview from './SurveyPreview'
import Button from '../ui/Button'
import { Question, QuestionType } from '../../types/survey'

const SurveyCreator: React.FC = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const { questions, addQuestion, updateQuestion, deleteQuestion, reorderQuestions, saveSurvey } = useSurveyStore()

  const handleAddQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: `question_${Date.now()}`,
      type,
      title: '',
      description: '',
      required: false,
      options: type === 'multiple_choice' ? ['Opção 1', 'Opção 2'] : [],
      scale: type === 'scale' ? { min: 1, max: 5, labels: {} } : undefined
    }
    addQuestion(newQuestion)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      reorderQuestions(active.id as string, over.id as string)
    }
  }

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Digite um título para a pesquisa')
      return
    }

    try {
      const surveyId = await saveSurvey({
        title,
        description,
        questions,
        settings: {
          allowAnonymous: true,
          showProgress: true,
          oneQuestionPerPage: true
        }
      })
      
      toast.success('Pesquisa salva com sucesso!')
      navigate(`/survey/${surveyId}`)
    } catch (error) {
      toast.error('Erro ao salvar pesquisa')
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título da pesquisa"
                className="w-full text-3xl font-bold bg-transparent border-none focus:outline-none placeholder-gray-400"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição (opcional)"
                className="w-full mt-2 text-gray-600 bg-transparent border-none focus:outline-none placeholder-gray-400 resize-none"
                rows={2}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsPreviewOpen(true)}
                icon={<Eye size={20} />}
              >
                Visualizar
              </Button>
              <Button
                onClick={handleSave}
                icon={<Save size={20} />}
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Tipos de Perguntas */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Tipos de Pergunta</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => handleAddQuestion('multiple_choice')}
                  className="justify-start"
                >
                  <Plus size={20} className="mr-2" />
                  Múltipla escolha
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => handleAddQuestion('text')}
                  className="justify-start"
                >
                  <Plus size={20} className="mr-2" />
                  Texto
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => handleAddQuestion('scale')}
                  className="justify-start"
                >
                  <Plus size={20} className="mr-2" />
                  Escala
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => handleAddQuestion('yes_no')}
                  className="justify-start"
                >
                  <Plus size={20} className="mr-2" />
                  Sim/Não
                </Button>
              </div>

              {/* Templates rápidos */}
              <div className="mt-8 pt-6 border-t">
                <h4 className="text-sm font-medium text-gray-500 mb-3">TEMPLATES ACADÊMICOS</h4>
                <div className="space-y-2">
                  <button className="text-sm text-left w-full p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
                    Avaliação de Disciplina
                  </button>
                  <button className="text-sm text-left w-full p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
                    Pesquisa de Clima Acadêmico
                  </button>
                  <button className="text-sm text-left w-full p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
                    Saúde Mental Estudantil
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Área principal - Perguntas */}
          <div className="lg:col-span-2">
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={questions.map(q => q.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {questions.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                      <div className="text-gray-400 mb-4">
                        <Plus size={48} className="mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        Nenhuma pergunta adicionada
                      </h3>
                      <p className="text-gray-500">
                        Clique em um tipo de pergunta ao lado para começar
                      </p>
                    </div>
                  ) : (
                    questions.map((question, index) => (
                      <QuestionCard
                        key={question.id}
                        question={question}
                        index={index}
                        onUpdate={updateQuestion}
                        onDelete={deleteQuestion}
                      />
                    ))
                  )}
                </div>
              </SortableContext>
            </DndContext>

            {questions.length > 0 && (
              <div className="mt-6 flex justify-between">
                <Button
                  variant="ghost"
                  onClick={() => handleAddQuestion('multiple_choice')}
                  icon={<Plus size={20} />}
                >
                  Adicionar pergunta
                </Button>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsPreviewOpen(true)}
                    icon={<Eye size={20} />}
                  >
                    Visualizar
                  </Button>
                  <Button
                    onClick={handleSave}
                    icon={<Save size={20} />}
                  >
                    Salvar pesquisa
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Preview */}
      {isPreviewOpen && (
        <SurveyPreview
          survey={{ title, description, questions }}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  )
}

export default SurveyCreator
