'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { apiClient } from '@/lib/client/api'
import { cn } from '@/lib/utils'
import { Message } from '@/types/chat'
import { SendHorizontal, StopCircle, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SimpleChatMessage } from './SimpleChatMessage'

interface ChatSidebarProps {
    caseId: string
    showChat: boolean
    onToggleChat: () => void
    selectedQuestion?: string | null
}

export function ChatSidebar({
    caseId,
    showChat,
    onToggleChat,
    selectedQuestion
}: ChatSidebarProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const abortControllerRef = useRef<AbortController | null>(null)
    const processedQuestionRef = useRef<string | null>(null)

    // Scroll handling
    const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
        if (!messagesEndRef.current) return
        messagesEndRef.current.scrollIntoView({ behavior })
    }

    const fetchChatHistory = async () => {
        try {
            setIsLoading(true)
            const data = await apiClient.get<Message[]>(
                `/api/v1/chat/${caseId}/history`
            )
            setMessages(data)
        } catch (error) {
            console.error('Error fetching chat history:', error)
            setMessages([])
        } finally {
            setIsLoading(false)
        }
    }

    const stopGeneration = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
            abortControllerRef.current = null
            setIsLoading(false)
        }
    }

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            if (!input.trim() || isLoading) return

            const userMessage = input.trim()
            setInput('')
            setIsLoading(true)

            // Create new AbortController for this request
            abortControllerRef.current = new AbortController()

            // Add user message immediately
            setMessages((prev) => [
                ...prev,
                {
                    role: 'USER',
                    content: userMessage,
                    createdAt: new Date().toISOString()
                }
            ])

            try {
                // Use fetch directly for streaming instead of apiClient
                const response = await fetch(`/api/v1/chat/${caseId}/stream`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message: userMessage }),
                    signal: abortControllerRef.current.signal
                })

                if (!response.ok) throw new Error('Failed to send message')

                const reader = response.body?.getReader()
                if (!reader) throw new Error('No reader available')

                // Add an empty assistant message that we'll update
                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'ASSISTANT',
                        content: '',
                        createdAt: new Date().toISOString()
                    }
                ])

                let fullResponse = ''
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break

                    // Decode the stream
                    const text = new TextDecoder().decode(value)
                    const lines = text.split('\n')

                    for (const line of lines) {
                        if (line.trim() === '') continue

                        if (line.startsWith('event: error')) {
                            // Skip this line and get the data line
                            continue
                        }

                        if (line.startsWith('data: ')) {
                            const chunk = line.slice(6)

                            // Only add newline if we receive an empty data line
                            if (chunk.trim() === '') {
                                fullResponse += '\n'
                                continue
                            }

                            fullResponse += chunk

                            // Update the last message with the new content
                            setMessages((prev) => {
                                const newMessages = [...prev]
                                const lastMessage = {
                                    ...newMessages[newMessages.length - 1]
                                }
                                lastMessage.content = fullResponse
                                newMessages[newMessages.length - 1] =
                                    lastMessage
                                return newMessages
                            })
                        }
                    }
                }
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    // Handle abort gracefully - don't show error message
                    return
                }
                console.error('Error in chat:', error)
                // Show error message to user
                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'SYSTEM',
                        content: `Error: ${error instanceof Error ? error.message : 'Something went wrong'}`,
                        createdAt: new Date().toISOString()
                    }
                ])
            } finally {
                setIsLoading(false)
                abortControllerRef.current = null
            }
        },
        [input, isLoading, caseId]
    )

    // Fetch chat history when the sidebar is opened
    useEffect(() => {
        if (showChat) {
            fetchChatHistory()
        } else {
            // Reset processed question tracking when chat is closed
            processedQuestionRef.current = null
        }
    }, [showChat, caseId])

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Handle selected question from parent component
    useEffect(() => {
        // Skip if no question, already loading, or this question was already processed
        if (
            !selectedQuestion ||
            isLoading ||
            selectedQuestion === processedQuestionRef.current
        ) {
            return
        }

        // Set the input text to the selected question (remove timestamp if present)
        const actualQuestion = selectedQuestion.split('__')[0]
        setInput(actualQuestion)

        // Mark this question as being processed to prevent duplicate submissions
        processedQuestionRef.current = selectedQuestion

        // Use a small timeout to allow state to update before submitting
        const timer = setTimeout(() => {
            if (isLoading) return

            const userMessage = actualQuestion.trim()
            if (!userMessage) return

            setInput('')
            setIsLoading(true)

            // Create new AbortController for this request
            abortControllerRef.current = new AbortController()

            // Add user message immediately
            setMessages((prev) => [
                ...prev,
                {
                    role: 'USER',
                    content: userMessage,
                    createdAt: new Date().toISOString()
                }
            ])

            // Continue with the fetch logic (similar to handleSubmit)
            fetch(`/api/v1/chat/${caseId}/stream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userMessage }),
                signal: abortControllerRef.current.signal
            })
                .then((response) => {
                    if (!response.ok) throw new Error('Failed to send message')
                    return response.body?.getReader()
                })
                .then((reader) => {
                    if (!reader) throw new Error('No reader available')

                    // Add an empty assistant message that we'll update
                    setMessages((prev) => [
                        ...prev,
                        {
                            role: 'ASSISTANT',
                            content: '',
                            createdAt: new Date().toISOString()
                        }
                    ])

                    let fullResponse = ''

                    const readChunk = () => {
                        reader
                            .read()
                            .then(({ done, value }) => {
                                if (done) return

                                // Decode the stream
                                const text = new TextDecoder().decode(value)
                                const lines = text.split('\n')

                                for (const line of lines) {
                                    if (line.trim() === '') continue

                                    if (line.startsWith('event: error')) {
                                        // Skip this line and get the data line
                                        continue
                                    }

                                    if (line.startsWith('data: ')) {
                                        const chunk = line.slice(6)

                                        // Only add newline if we receive an empty data line
                                        if (chunk.trim() === '') {
                                            fullResponse += '\n'
                                            continue
                                        }

                                        fullResponse += chunk

                                        // Update the last message with the new content
                                        setMessages((prev) => {
                                            const newMessages = [...prev]
                                            const lastMessage = {
                                                ...newMessages[
                                                    newMessages.length - 1
                                                ]
                                            }
                                            lastMessage.content = fullResponse
                                            newMessages[
                                                newMessages.length - 1
                                            ] = lastMessage
                                            return newMessages
                                        })
                                    }
                                }

                                readChunk()
                            })
                            .catch((error) => {
                                if (
                                    error instanceof Error &&
                                    error.name === 'AbortError'
                                ) {
                                    // Handle abort gracefully - don't show error message
                                    return
                                }
                                console.error('Error in chat:', error)
                                // Show error message to user
                                setMessages((prev) => [
                                    ...prev,
                                    {
                                        role: 'SYSTEM',
                                        content: `Error: ${error instanceof Error ? error.message : 'Something went wrong'}`,
                                        createdAt: new Date().toISOString()
                                    }
                                ])
                            })
                            .finally(() => {
                                setIsLoading(false)
                                abortControllerRef.current = null
                            })
                    }

                    readChunk()
                })
                .catch((error) => {
                    if (error instanceof Error && error.name === 'AbortError') {
                        // Handle abort gracefully - don't show error message
                        return
                    }
                    console.error('Error in chat:', error)
                    // Show error message to user
                    setMessages((prev) => [
                        ...prev,
                        {
                            role: 'SYSTEM',
                            content: `Error: ${error instanceof Error ? error.message : 'Something went wrong'}`,
                            createdAt: new Date().toISOString()
                        }
                    ])
                    setIsLoading(false)
                    abortControllerRef.current = null
                })
        }, 100)

        return () => clearTimeout(timer)
    }, [selectedQuestion, isLoading, caseId])

    return (
        <div
            className={cn(
                'fixed top-[58px] right-0 bottom-0 w-[400px] border-l border-gray-200 bg-white shadow-[-4px_0px_10px_rgba(0,0,0,0.03)] z-50',
                'transition-transform duration-300 ease-in-out',
                showChat ? 'translate-x-0' : 'translate-x-full'
            )}
        >
            <div className='relative h-full flex flex-col'>
                {/* Header */}
                <div className='px-4 py-3 border-b flex items-center justify-between bg-white'>
                    <h3 className='text-sm font-medium text-gray-700'>
                        Chat with Memo
                    </h3>
                    {/* Close button moved into header */}
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={onToggleChat}
                        className='h-7 w-7 hover:bg-gray-100'
                    >
                        <X className='h-4 w-4 text-gray-500' />
                        <span className='sr-only'>Close</span>
                    </Button>
                </div>

                <div
                    ref={chatContainerRef}
                    className='flex-1 overflow-y-auto p-4 space-y-3'
                >
                    {messages.length === 0 ? (
                        <div className='h-full flex flex-col items-center justify-center text-center text-gray-500'>
                            <div className='space-y-2'>
                                <div className='rounded-full bg-gray-50 p-2 w-10 h-10 flex items-center justify-center mx-auto'>
                                    <SendHorizontal className='h-5 w-5 text-gray-400' />
                                </div>
                                <div>
                                    <h3 className='text-sm font-medium mb-1 text-gray-600'>
                                        No messages yet
                                    </h3>
                                    <p className='text-xs text-gray-500'>
                                        Start a conversation about this case.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    message.role === 'USER'
                                        ? 'justify-end'
                                        : 'justify-start'
                                }`}
                            >
                                <SimpleChatMessage message={message} />
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} className='h-px' />
                </div>

                <div className='border-t p-4 bg-white'>
                    <form
                        onSubmit={handleSubmit}
                        className='flex items-start space-x-2'
                    >
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Type your message...'
                            disabled={isLoading}
                            className='flex-1 min-h-[36px] max-h-[120px] resize-none text-xs border-gray-200 bg-gray-50 focus:bg-white'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSubmit(e)
                                }
                            }}
                        />
                        {isLoading ? (
                            <Button
                                type='button'
                                onClick={stopGeneration}
                                variant='destructive'
                                size='icon'
                                className='h-8 w-8'
                            >
                                <StopCircle className='h-3.5 w-3.5' />
                                <span className='sr-only'>Stop generation</span>
                            </Button>
                        ) : (
                            <Button
                                type='submit'
                                disabled={isLoading || !input.trim()}
                                size='icon'
                                className='h-8 w-8'
                            >
                                <SendHorizontal className='h-3.5 w-3.5' />
                                <span className='sr-only'>Send message</span>
                            </Button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}
