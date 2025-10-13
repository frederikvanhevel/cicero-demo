'use client'

import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/client/api'
import { cn } from '@/lib/utils'
import { ChevronDown, Edit } from 'lucide-react'
import { useState } from 'react'
import { findLabelForValue, QUESTION_LABELS } from '../utils/labelMapper'

interface QuestionnaireAnswersProps {
    answers: Record<string, any>
    onClose: () => void
    caseId: string
}

export function QuestionnaireAnswers({
    answers,
    onClose,
    caseId
}: QuestionnaireAnswersProps) {
    const [editMode, setEditMode] = useState(false)
    const [expandedSections, setExpandedSections] = useState<
        Record<string, boolean>
    >(() => ({
        'research-sectors': true,
        'entity-type': true,
        'material-format': true,
        'material-questions': true,
        'research-description': true
    }))

    // Group answers by section based on known question codes and steps
    const sections = [
        {
            id: 'research-sectors',
            label: 'Research Sectors',
            questions: ['sectors']
        },
        {
            id: 'entity-type',
            label: 'Entity Type',
            questions: ['entity_type']
        },
        {
            id: 'material-format',
            label: 'Material Format',
            questions: ['material_format']
        },
        {
            id: 'material-questions',
            label: 'Material Questions',
            questions: [
                'material_nature',
                'material_description',
                'special_features',
                'other_special_features',
                'acquisition_locations',
                'acquisition_date',
                'acquisition_conditions',
                'indigenous_status'
            ]
        },
        {
            id: 'research-description',
            label: 'Research Description',
            questions: ['research_activities']
        }
    ]

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }))
    }

    const handleEdit = () => {
        setEditMode(true)
    }

    const handleSave = async () => {
        try {
            await apiClient.patch(`/api/v1/cases/${caseId}`, {
                answers
            })
            setEditMode(false)
        } catch (error) {
            console.error('Failed to save answers:', error)
        }
    }

    const handleCancel = () => {
        setEditMode(false)
    }

    const renderAnswerValue = (questionId: string, value: any) => {
        if (value === null || value === undefined) {
            return (
                <span className='text-gray-400 italic text-xs'>
                    Not provided
                </span>
            )
        }

        if (questionId === 'acquisition_locations' && Array.isArray(value)) {
            return (
                <div className='space-y-1'>
                    {value.map((pair, index) => (
                        <div key={index} className='flex items-start'>
                            <span className='text-gray-400 mr-1.5 text-xs'>
                                •
                            </span>
                            <span className='text-xs text-gray-700'>
                                {pair.country}
                                {pair.dateInput && ` (${pair.dateInput})`}
                            </span>
                        </div>
                    ))}
                </div>
            )
        }

        if (Array.isArray(value)) {
            return (
                <div className='space-y-1'>
                    {value.map((item, index) => (
                        <div key={index} className='flex items-start'>
                            <span className='text-gray-400 mr-1.5 text-xs'>
                                •
                            </span>
                            <span className='text-xs text-gray-700'>
                                {findLabelForValue(item, questionId)}
                            </span>
                        </div>
                    ))}
                </div>
            )
        }

        if (questionId === 'acquisition_date' && typeof value === 'object') {
            if (value.type === 'specific_date' && value.date) {
                const date = new Date(value.date)
                return (
                    <span className='text-xs text-gray-700'>
                        {date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                )
            } else if (value.type === 'unknown') {
                return (
                    <span className='text-xs text-gray-700'>
                        I don&apos;t know
                    </span>
                )
            } else {
                return (
                    <span className='text-xs text-gray-700'>
                        {value.type || ''}
                    </span>
                )
            }
        }

        if (typeof value === 'object') {
            return (
                <div className='space-y-1'>
                    {Object.entries(value).map(([key, val]) => (
                        <div key={key} className='flex items-start'>
                            <span className='text-gray-500 mr-1.5 font-medium text-xs'>
                                {key}:
                            </span>
                            <span className='text-xs text-gray-700'>
                                {String(val)}
                            </span>
                        </div>
                    ))}
                </div>
            )
        }

        if (typeof value === 'string') {
            return (
                <span className='text-xs text-gray-700'>
                    {findLabelForValue(value, questionId)}
                </span>
            )
        }

        return <span className='text-xs text-gray-700'>{value}</span>
    }

    return (
        <div className='h-full flex flex-col'>
            <div className='bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center justify-between'>
                <div className='text-xs text-gray-600 font-medium'>
                    {editMode ? 'Edit mode' : 'View mode'}
                </div>
                {!editMode ? (
                    <Button
                        variant='outline'
                        size='sm'
                        onClick={handleEdit}
                        className='h-6 px-2 text-xs border-gray-200 bg-white hover:bg-primary/[0.02] hover:text-gray-900 hover:border-primary/30'
                    >
                        <Edit className='h-3 w-3 mr-1' />
                        Edit
                    </Button>
                ) : (
                    <div className='flex items-center gap-1.5'>
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={handleCancel}
                            className='h-6 px-2 text-xs'
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='default'
                            size='sm'
                            onClick={handleSave}
                            className='h-6 px-2 text-xs'
                        >
                            Save
                        </Button>
                    </div>
                )}
            </div>

            <div className='flex-1 overflow-auto'>
                <div className='p-2 space-y-1.5'>
                    {sections.map((section) => {
                        const isExpanded = expandedSections[section.id]
                        const sectionHasAnswers = section.questions.some(
                            (q) => q in answers
                        )

                        if (!sectionHasAnswers) return null

                        return (
                            <div
                                key={section.id}
                                className='bg-white border border-gray-200 rounded-md overflow-hidden'
                            >
                                <div
                                    className='px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-50'
                                    onClick={() => toggleSection(section.id)}
                                >
                                    <h3 className='text-xs font-medium text-gray-800'>
                                        {section.label}
                                    </h3>
                                    <div
                                        className={cn(
                                            'h-4 w-4 transform transition-transform',
                                            isExpanded
                                                ? 'rotate-180'
                                                : 'rotate-0'
                                        )}
                                    >
                                        <ChevronDown className='h-4 w-4 text-gray-400' />
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className='bg-gray-50 px-3 py-2 border-t border-gray-200'>
                                        <div className='space-y-3'>
                                            {section.questions.map(
                                                (questionId) => {
                                                    if (
                                                        !(questionId in answers)
                                                    )
                                                        return null

                                                    const label =
                                                        QUESTION_LABELS[
                                                            questionId
                                                        ] || questionId

                                                    return (
                                                        <div
                                                            key={questionId}
                                                            className='space-y-1'
                                                        >
                                                            <div className='text-xs font-medium text-gray-700'>
                                                                {label}
                                                            </div>
                                                            <div className='pl-2 border-l-2 border-gray-300'>
                                                                {renderAnswerValue(
                                                                    questionId,
                                                                    answers[
                                                                        questionId
                                                                    ]
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
