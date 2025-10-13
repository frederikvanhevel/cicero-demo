'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChatSidebar } from './ChatSidebar'
import { MemorandumContent } from './MemorandumContent'
import { MemorandumHeader } from './MemorandumHeader'
import { MemorandumSidebar } from './MemorandumSidebar'

interface MemorandumProps {
    title: string
    content: string
    sector: string
    status: 'SUBMITTED' | 'COMPLETED' | 'PROCESSING' | 'DRAFT' | 'FAILED'
    date: string | Date
    answers?: Record<string, any>
    suggestedQuestions?: string[]
}

interface SuggestedQuestionsProps {
    questions: string[]
    onQuestionClick: (question: string) => void
}

function SuggestedQuestions({
    questions,
    onQuestionClick
}: SuggestedQuestionsProps) {
    if (!questions || questions.length === 0) return null

    return (
        <div className='max-w-3xl mx-auto mt-6'>
            <h3 className='text-sm font-medium text-gray-700 mb-2'>
                Suggested questions to explore:
            </h3>
            <div className='flex flex-wrap gap-2'>
                {questions.map((question, index) => (
                    <button
                        key={index}
                        onClick={() => onQuestionClick(question)}
                        className='text-sm bg-accent-blue-50 text-accent-blue-600 hover:bg-accent-blue-100 transition-colors px-3 py-1.5 rounded-full border border-accent-blue-200'
                    >
                        {question}
                    </button>
                ))}
            </div>
        </div>
    )
}

export function Memorandum({
    title,
    content,
    sector,
    status,
    date,
    answers = {},
    suggestedQuestions = []
}: MemorandumProps) {
    const { caseId } = useParams()
    const [showQuestionnaire, setShowQuestionnaire] = useState(true)
    const [showChat, setShowChat] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(
        null
    )

    const toggleQuestionnaire = () => {
        setShowQuestionnaire((prev) => !prev)
    }

    const toggleChat = () => {
        setShowChat((prev) => !prev)
    }

    const handleQuestionClick = (question: string) => {
        if (!showChat) {
            setShowChat(true)
        }
        setSelectedQuestion(`${question}__${Date.now()}`)
    }

    useEffect(() => {
        if (!showChat) {
            setSelectedQuestion(null)
        }
    }, [showChat])

    return (
        <div className='h-[calc(100vh-64px)] w-full flex flex-col overflow-hidden bg-gray-50'>
            <MemorandumHeader
                title={title}
                sector={sector}
                status={status}
                date={date}
                caseId={caseId as string}
                onToggleChat={toggleChat}
                showChat={showChat}
            />

            <div className='flex-1 flex overflow-hidden'>
                {/* Left sidebar with smooth width transition */}
                <div
                    className={`transition-all duration-300 ease-in-out ${
                        showQuestionnaire ? 'w-80' : 'w-0'
                    } flex-shrink-0 overflow-hidden`}
                >
                    <MemorandumSidebar
                        answers={answers}
                        caseId={caseId as string}
                        showQuestionnaire={showQuestionnaire}
                        onToggleQuestionnaire={toggleQuestionnaire}
                    />
                </div>

                {/* Main content area that flexes with sidebars */}
                <div
                    className={`
                    flex-1 overflow-auto p-5 transition-all duration-300 ease-in-out
                    ${showChat ? 'mr-[400px]' : 'mr-0'}
                `}
                >
                    <div className='max-w-4xl mx-auto'>
                        <MemorandumContent content={content} />
                        <SuggestedQuestions
                            questions={suggestedQuestions}
                            onQuestionClick={handleQuestionClick}
                        />
                    </div>
                </div>

                {/* Right sidebar with fixed positioning */}
                <div
                    className={`
                        fixed right-0 top-[64px] bottom-0 w-[400px] 
                        transition-transform duration-300 ease-in-out
                        border-l border-gray-200 bg-white
                        ${showChat ? 'translate-x-0' : 'translate-x-full'}
                    `}
                >
                    <ChatSidebar
                        caseId={caseId as string}
                        showChat={showChat}
                        onToggleChat={toggleChat}
                        selectedQuestion={selectedQuestion}
                    />
                </div>
            </div>
        </div>
    )
}
