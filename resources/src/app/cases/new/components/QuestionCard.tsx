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
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 px-4'>
            {/* Question Card */}
            <div className='lg:col-span-8'>
                <Card className='p-8'>
                    <div className='space-y-6'>
                        <div className='space-y-2'>
                            <div className='flex items-center gap-3'>
                                <span className='text-sm font-medium text-primary'>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                {question.required && (
                                    <span
                                        className={`text-sm ${showValidation ? 'text-red-500' : 'text-muted-foreground'}`}
                                    >
                                        Required
                                    </span>
                                )}
                            </div>
                            <h3 className='text-xl font-semibold'>
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
                    <div className='space-y-3 pl-4 border-l border-border/40'>
                        <div className='flex items-center gap-2 mb-4 text-muted-foreground/70'>
                            <HelpCircle className='h-4 w-4' />
                            <h2 className='text-xs font-medium uppercase tracking-wider'>
                                Help & Context
                            </h2>
                        </div>
                        <div className='space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4'>
                            {helpContent && (
                                <p className='text-sm text-muted-foreground/80 leading-relaxed whitespace-pre-line'>
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
