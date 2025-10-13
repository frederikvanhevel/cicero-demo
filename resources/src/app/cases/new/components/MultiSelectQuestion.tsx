'use client'

import { CountrySelect } from './CountrySelect'
import { MultiSelect } from './MultiSelect'
import { Question } from './types'

interface MultiSelectQuestionProps {
    question: Question
    value: string[]
    onChange: (value: string[]) => void
    error?: string
}

export function MultiSelectQuestion({
    question,
    value = [],
    onChange,
    error
}: MultiSelectQuestionProps) {
    const isCountryQuestion = question.code === 'acquisition_locations'

    return (
        <div className='space-y-2'>
            {isCountryQuestion ? (
                <CountrySelect
                    value={value}
                    onChange={onChange}
                    placeholder={question.options?.placeholder}
                    className={error ? 'border-destructive' : ''}
                />
            ) : (
                <MultiSelect
                    options={question.options?.options || []}
                    selected={value}
                    onChange={onChange}
                    placeholder={question.options?.placeholder}
                    className={error ? 'border-destructive' : ''}
                />
            )}
        </div>
    )
}
