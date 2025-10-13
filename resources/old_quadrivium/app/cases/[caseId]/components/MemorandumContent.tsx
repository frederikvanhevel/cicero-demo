'use client'

import ReactMarkdown from 'react-markdown'

interface MemorandumContentProps {
    content: string
}

export function MemorandumContent({ content }: MemorandumContentProps) {
    return (
        <div className='max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-5'>
            <div className='prose prose-sm prose-gray max-w-none'>
                <ReactMarkdown
                    components={{
                        h1: ({ children }) => (
                            <h1 className='text-lg font-semibold mb-3 text-gray-900 border-b pb-2 border-gray-200'>
                                {children}
                            </h1>
                        ),
                        h2: ({ children }) => (
                            <h2 className='text-base font-medium mb-2 mt-4 text-gray-900'>
                                {children}
                            </h2>
                        ),
                        h3: ({ children }) => (
                            <h3 className='text-sm font-medium mb-1.5 mt-3 text-gray-900'>
                                {children}
                            </h3>
                        ),
                        ul: ({ children }) => (
                            <ul className='list-disc pl-5 space-y-1.5 mb-3'>
                                {children}
                            </ul>
                        ),
                        li: ({ children }) => (
                            <li className='text-sm text-gray-700'>
                                {children}
                            </li>
                        ),
                        p: ({ children }) => (
                            <p className='text-sm text-gray-700 mb-3 leading-relaxed'>
                                {children}
                            </p>
                        )
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    )
}
