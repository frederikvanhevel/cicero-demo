'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { HelpCircle } from 'lucide-react'
import React, { useCallback, useMemo, useReducer } from 'react'
import { QuestionCard } from './QuestionCard'
import { CaseFormData, Question } from './types'

interface SinglePageFormProps {
    questions: Question[]
    onSubmit: (data: CaseFormData) => Promise<void>
    onProgressChange?: (progress: { answered: number; total: number; percentage: number }) => void
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

export function SinglePageForm({ questions, onSubmit, onProgressChange }: SinglePageFormProps) {
    const [formState, dispatch] = useReducer(formReducer, {
        values: {},
        isSubmitting: false,
        showValidation: false,
        validationErrors: []
    })

    // Calculate progress based on required questions only
    const requiredQuestions = questions.filter((q) => q.required)
    const answeredRequiredQuestions = requiredQuestions.filter(
        (q) => formState.values[q.code] !== undefined && formState.values[q.code] !== '' &&
        (Array.isArray(formState.values[q.code]) ? formState.values[q.code].length > 0 : true)
    ).length
    const progress = requiredQuestions.length > 0
        ? Math.round((answeredRequiredQuestions / requiredQuestions.length) * 100)
        : 100

    // Notify parent of progress changes
    React.useEffect(() => {
        if (onProgressChange) {
            onProgressChange({
                answered: answeredRequiredQuestions,
                total: requiredQuestions.length,
                percentage: progress
            })
        }
    }, [answeredRequiredQuestions, progress, requiredQuestions.length, onProgressChange])

    const validateForm = useCallback(() => {
        const missingFields = questions
            .filter((q) => q.required && !formState.values[q.code])
            .map((q) => q.text)
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
            <div className='container max-w-7xl mx-auto py-6'>
                <form onSubmit={handleSubmit}>
                    <div className='space-y-6'>
                        {QuestionSection}
                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 px-4'>
                            <div className='lg:col-span-8'>
                                <Card className='p-6 shadow-sm hover:shadow-md transition-all duration-100'>
                                    <div className='space-y-5'>
                                        <div className='space-y-3'>
                                            <div className='flex items-center gap-3'>
                                                <span className='text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded'>
                                                    {String(
                                                        questions.length + 1
                                                    ).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <h3 className='text-lg font-semibold text-foreground leading-tight'>
                                                Ready to Submit
                                            </h3>
                                            <p className='text-sm text-muted-foreground leading-relaxed'>
                                                Please review your answers
                                                before submitting. Make sure all
                                                required fields are filled
                                                correctly.
                                            </p>
                                        </div>
                                        {formState.showValidation &&
                                            formState.validationErrors.length >
                                                0 && (
                                                <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
                                                    <p className='text-sm font-semibold text-red-800 mb-2'>
                                                        Please fill in all
                                                        required fields:
                                                    </p>
                                                    <ul className='list-disc list-inside text-sm text-red-700 space-y-1'>
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
                                                className='h-9 px-4 cursor-pointer bg-accent text-white hover:bg-accent/90'
                                            >
                                                {formState.isSubmitting
                                                    ? 'Generating...'
                                                    : 'Generate Memorandum'}
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className='lg:col-span-4'>
                                <div className='sticky top-32'>
                                    <div className='space-y-3 pl-4 border-l-2 border-border/30'>
                                        <div className='flex items-center gap-2 mb-3 text-muted-foreground'>
                                            <HelpCircle className='h-3.5 w-3.5' />
                                            <h2 className='text-xs font-semibold uppercase tracking-wide'>
                                                Help & Context
                                            </h2>
                                        </div>
                                        <div className='space-y-3 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4'>
                                            <p className='text-sm text-muted-foreground leading-relaxed'>
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
