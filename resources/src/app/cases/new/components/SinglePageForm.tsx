'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { HelpCircle } from 'lucide-react'
import { useCallback, useMemo, useReducer } from 'react'
import { QUESTION_LABELS } from '../../[caseId]/utils/labelMapper'
import { QuestionCard } from './QuestionCard'
import { CaseFormData, Question } from './types'

interface SinglePageFormProps {
    questions: Question[]
    onSubmit: (data: CaseFormData) => Promise<void>
}

type FormState = {
    values: Record<string, any>
    isSubmitting: boolean
    showValidation: boolean
    validationErrors: string[]
}

type FormAction =
    | { type: 'UPDATE_FIELD'; field: string; value: any }
    | { type: 'SET_SUBMITTING'; value: boolean }
    | { type: 'SET_VALIDATION'; show: boolean; errors?: string[] }

function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.field]: action.value
                }
            }
        case 'SET_SUBMITTING':
            return {
                ...state,
                isSubmitting: action.value
            }
        case 'SET_VALIDATION':
            return {
                ...state,
                showValidation: action.show,
                validationErrors: action.errors || []
            }
        default:
            return state
    }
}

export function SinglePageForm({ questions, onSubmit }: SinglePageFormProps) {
    const [formState, dispatch] = useReducer(formReducer, {
        values: {},
        isSubmitting: false,
        showValidation: false,
        validationErrors: []
    })

    const validateForm = useCallback(() => {
        const missingFields = questions
            .filter((q) => q.required && !formState.values[q.code])
            .map((q) => QUESTION_LABELS[q.code] || q.text)
        return missingFields
    }, [questions, formState.values])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const missingFields = validateForm()

        if (missingFields.length > 0) {
            dispatch({
                type: 'SET_VALIDATION',
                show: true,
                errors: missingFields
            })
            return
        }

        dispatch({ type: 'SET_SUBMITTING', value: true })
        try {
            await onSubmit(formState.values)
        } catch (error) {
            console.error('Error submitting form:', error)
            dispatch({ type: 'SET_SUBMITTING', value: false })
        }
    }

    const updateFieldValue = useCallback((fieldCode: string, value: any) => {
        dispatch({ type: 'UPDATE_FIELD', field: fieldCode, value })
    }, [])

    const QuestionSection = useMemo(() => {
        let currentSection = ''

        return questions.map((question, index) => {
            const isNewSection = currentSection !== question.sectionTitle
            if (isNewSection) {
                currentSection = question.sectionTitle || ''
            }

            return (
                <QuestionCard
                    key={question.code}
                    question={question}
                    stepTitle={isNewSection ? question.sectionTitle || '' : ''}
                    stepDescription={
                        isNewSection ? question.sectionDescription || '' : ''
                    }
                    index={index}
                    isFirstQuestionOfStep={isNewSection}
                    value={formState.values[question.code]}
                    onChange={(value) => updateFieldValue(question.code, value)}
                    showValidation={
                        formState.showValidation &&
                        question.required &&
                        !formState.values[question.code]
                    }
                />
            )
        })
    }, [
        questions,
        formState.values,
        formState.showValidation,
        updateFieldValue
    ])

    return (
        <div className='min-h-screen bg-background'>
            <div className='container max-w-7xl mx-auto my-6'>
                <form onSubmit={handleSubmit}>
                    <div className='space-y-8'>
                        {QuestionSection}
                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 px-4'>
                            <div className='lg:col-span-8'>
                                <Card className='p-8'>
                                    <div className='space-y-6'>
                                        <div className='space-y-2'>
                                            <div className='flex items-center gap-3'>
                                                <span className='text-sm font-medium text-primary'>
                                                    {String(
                                                        questions.length + 1
                                                    ).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <h3 className='text-xl font-semibold'>
                                                Ready to Submit
                                            </h3>
                                            <p className='text-sm text-muted-foreground'>
                                                Please review your answers
                                                before submitting. Make sure all
                                                required fields are filled
                                                correctly.
                                            </p>
                                        </div>
                                        {formState.showValidation &&
                                            formState.validationErrors.length >
                                                0 && (
                                                <div className='p-4 bg-red-50 border border-red-200 rounded-md'>
                                                    <p className='text-sm font-medium text-red-800 mb-1'>
                                                        Please fill in all
                                                        required fields:
                                                    </p>
                                                    <ul className='list-disc list-inside text-sm text-red-700'>
                                                        {formState.validationErrors.map(
                                                            (error, index) => (
                                                                <li key={index}>
                                                                    {error}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        <div>
                                            <Button
                                                type='submit'
                                                disabled={
                                                    formState.isSubmitting
                                                }
                                                className='bg-[#1e335f] hover:bg-[#1e335f]/90'
                                            >
                                                {formState.isSubmitting
                                                    ? 'Submitting...'
                                                    : 'Submit Case'}
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className='lg:col-span-4'>
                                <div className='sticky top-32'>
                                    <div className='space-y-3 pl-4 border-l border-border/40'>
                                        <div className='flex items-center gap-2 mb-4 text-muted-foreground/70'>
                                            <HelpCircle className='h-4 w-4' />
                                            <h2 className='text-xs font-medium uppercase tracking-wider'>
                                                Help & Context
                                            </h2>
                                        </div>
                                        <div className='space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4'>
                                            <p className='text-sm text-muted-foreground/80 leading-relaxed'>
                                                Review all your answers
                                                carefully before submitting.
                                                Once submitted, you&apos;ll be
                                                able to track the progress of
                                                your case.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
