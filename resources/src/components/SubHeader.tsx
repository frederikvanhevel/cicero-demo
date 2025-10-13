'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SubHeaderProps {
    title: string
    backLink?: {
        href: string
        label: string
        icon?: ReactNode
    }
    metadata?: ReactNode
    actions?: ReactNode
    className?: string
    centerTitle?: boolean
}

export function SubHeader({
    title,
    backLink,
    metadata,
    actions,
    className,
    centerTitle = false
}: SubHeaderProps) {
    return (
        <div
            className={cn(
                'w-full bg-white border-b border-gray-200 flex items-center px-3 py-1.5 z-10 shadow-sm min-h-14',
                className
            )}
        >
            <div className='flex items-center gap-3 w-[200px]'>
                {backLink && (
                    <a
                        href={backLink.href}
                        className='inline-flex items-center px-2 py-1 text-xs text-gray-700 hover:text-primary transition-colors rounded-md hover:bg-gray-100'
                    >
                        {backLink.icon}
                        {backLink.label}
                    </a>
                )}
                {!centerTitle && (
                    <h1 className='text-sm font-medium text-gray-800'>
                        {title}
                    </h1>
                )}
            </div>

            {centerTitle ? (
                <div className='flex-1 flex flex-col items-center'>
                    <h1 className='text-sm font-medium text-gray-800 truncate max-w-2xl'>
                        {title}
                    </h1>
                    {metadata && (
                        <div className='flex items-center gap-1.5 mt-0.5'>
                            {metadata}
                        </div>
                    )}
                </div>
            ) : (
                <div className='flex items-center'>
                    {metadata && (
                        <div className='flex items-center gap-1.5 mr-3'>
                            {metadata}
                        </div>
                    )}
                </div>
            )}

            <div className='flex items-center gap-1.5 w-[200px] justify-end'>
                {actions}
            </div>
        </div>
    )
}
