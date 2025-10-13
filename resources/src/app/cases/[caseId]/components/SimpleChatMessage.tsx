'use client'

import { cn } from '@/lib/utils'
import { Message } from '@/types/chat'
import ReactMarkdown from 'react-markdown'

interface SimpleChatMessageProps {
    message: Message
}

export function SimpleChatMessage({ message }: SimpleChatMessageProps) {
    return (
        <div
            className={cn(
                'rounded-lg px-3 py-2 text-sm max-w-[90%] shadow-sm',
                message.role === 'USER'
                    ? 'bg-primary text-white ml-auto'
                    : message.role === 'SYSTEM'
                      ? 'bg-destructive text-white'
                      : 'bg-gray-50 border border-gray-100'
            )}
        >
            {message.role === 'USER' ? (
                <div className='whitespace-pre-wrap text-sm'>
                    {message.content}
                </div>
            ) : (
                <ReactMarkdown
                    className='prose-sm prose-gray max-w-none break-words text-sm'
                    components={{
                        p: ({ children }) => (
                            <p className='whitespace-pre-wrap text-sm mb-2'>
                                {children}
                            </p>
                        ),
                        ul: ({ children }) => (
                            <ul className='list-disc pl-4 space-y-1 mb-2 text-sm'>
                                {children}
                            </ul>
                        ),
                        li: ({ children }) => (
                            <li className='text-sm'>{children}</li>
                        ),
                        code: ({ children }) => (
                            <code className='px-1 py-0.5 rounded bg-black/5 text-sm'>
                                {children}
                            </code>
                        )
                    }}
                >
                    {message.content}
                </ReactMarkdown>
            )}
            <div className='mt-1 flex justify-end'>
                <span className='text-[11px] opacity-70'>
                    {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </span>
            </div>
        </div>
    )
}
