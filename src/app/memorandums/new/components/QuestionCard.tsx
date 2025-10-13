'use client'

import { Card } from '@/components/ui/card'
import { HelpCircle } from 'lucide-react'
import { QuestionInput } from './QuestionInput'
import { Question } from './types'

export interface QuestionCardProps {
    question: Question
    stepTitle: string
    stepDescription: string
    index: number
    isFirstQuestionOfStep: boolean
    value: any
    onChange: (value: any) => void
    showValidation?: boolean
}

export function QuestionCard({
    question,
    stepTitle,
    stepDescription,
    index,
    isFirstQuestionOfStep,
    value,
    onChange,
    showValidation
}: QuestionCardProps) {
    const helpContent = isFirstQuestionOfStep
        ? stepDescription
        : question.help || null

    return (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 px-4'>
            {/* Question Card */}
            <div className='lg:col-span-8'>
                <Card className='p-6 shadow-sm hover:shadow-md transition-all duration-100'>
                    <div className='space-y-5'>
                        <div className='space-y-3'>
                            <div className='flex items-center gap-3'>
                                <span className='text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded'>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                {question.required && (
                                    <span
                                        className={`text-xs px-2 py-1 rounded ${showValidation ? 'text-red-600 bg-red-50' : 'text-muted-foreground bg-muted'}`}
                                    >
                                        Required
                                    </span>
                                )}
                            </div>
                            <h3 className='text-lg font-semibold text-foreground leading-tight'>
                                {question.text}
                            </h3>
                            {stepTitle && stepTitle !== stepDescription && (
                                <p className='text-sm text-muted-foreground'>
                                    {stepTitle}
                                </p>
                            )}
                        </div>

                        <QuestionInput
                            question={question}
                            value={value}
                            onChange={onChange}
                            showValidation={showValidation}
                        />
                    </div>
                </Card>
            </div>

            {/* Detailed Explanation */}
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
                            {helpContent && (
                                <p className='text-sm text-muted-foreground leading-relaxed whitespace-pre-line'>
                                    {helpContent}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
