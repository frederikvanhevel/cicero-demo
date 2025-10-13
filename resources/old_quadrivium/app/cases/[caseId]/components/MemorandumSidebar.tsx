'use client'

import { QuestionnaireAnswers } from './QuestionnaireAnswers'

interface MemorandumSidebarProps {
    answers: Record<string, any>
    caseId: string
    showQuestionnaire: boolean
    onToggleQuestionnaire: () => void
}

export function MemorandumSidebar({
    answers,
    caseId,
    showQuestionnaire,
    onToggleQuestionnaire
}: MemorandumSidebarProps) {
    return (
        <div
            className={`border-r border-gray-200 bg-white transition-all duration-300 ease-in-out flex flex-col ${
                showQuestionnaire ? 'w-72' : 'w-0'
            }`}
        >
            {showQuestionnaire && (
                <QuestionnaireAnswers
                    answers={answers}
                    onClose={onToggleQuestionnaire}
                    caseId={caseId}
                />
            )}
        </div>
    )
}
