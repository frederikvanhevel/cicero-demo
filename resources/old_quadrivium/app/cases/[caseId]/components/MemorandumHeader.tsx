'use client'

import { DateBadge, SectorBadge, StatusBadge } from '@/components/badges'
import { SubHeader } from '@/components/SubHeader'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/client/api'
import { ArrowLeft, Download, Loader2, MessageSquare } from 'lucide-react'
import { useState } from 'react'

interface MemorandumHeaderProps {
    title: string
    sector: string
    status: 'SUBMITTED' | 'COMPLETED' | 'PROCESSING' | 'DRAFT' | 'FAILED'
    date: string | Date
    caseId: string
    onToggleChat: () => void
    showChat: boolean
}

export function MemorandumHeader({
    title,
    sector,
    status,
    date,
    caseId,
    onToggleChat,
    showChat
}: MemorandumHeaderProps) {
    const [isDownloading, setIsDownloading] = useState(false)

    const handleDownload = async () => {
        try {
            setIsDownloading(true)
            const response = await apiClient.get<Blob>(
                `/api/v1/cases/${caseId}/download`,
                {
                    responseType: 'blob',
                    headers: {
                        'Content-Type': 'application/pdf'
                    }
                }
            )
            const url = URL.createObjectURL(response)
            window.open(url, '_blank')
        } catch (error) {
            console.error('Error downloading PDF:', error)
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <SubHeader
            title={title}
            centerTitle={true}
            backLink={{
                href: '/cases',
                label: 'Back to Cases',
                icon: <ArrowLeft className='w-3.5 h-3.5 mr-1.5' />
            }}
            metadata={
                <>
                    <StatusBadge status={status} />
                    <span className='text-gray-400 text-xs'>•</span>
                    <SectorBadge sector={sector} />
                    <span className='text-gray-400 text-xs'>•</span>
                    <DateBadge date={date} />
                </>
            }
            actions={
                <>
                    {status === 'COMPLETED' && (
                        <Button
                            variant={showChat ? 'default' : 'outline'}
                            size='sm'
                            className={`text-xs h-7 px-2 ${
                                showChat
                                    ? 'text-primary-foreground'
                                    : 'text-gray-700 border-gray-200 bg-white hover:bg-primary/[0.02] hover:text-gray-900 hover:border-primary/30'
                            }`}
                            onClick={onToggleChat}
                        >
                            <MessageSquare className='w-3.5 h-3.5 mr-1.5' />
                            Chat with Results
                        </Button>
                    )}
                    <Button
                        variant='outline'
                        size='sm'
                        className='text-xs h-7 px-2 text-gray-700 border-gray-200 bg-white hover:bg-primary/[0.02] hover:text-gray-900 hover:border-primary/30'
                        onClick={handleDownload}
                        disabled={isDownloading}
                    >
                        {isDownloading ? (
                            <Loader2 className='w-3.5 h-3.5 mr-1.5 animate-spin' />
                        ) : (
                            <Download className='w-3.5 h-3.5 mr-1.5' />
                        )}
                        {isDownloading ? 'Downloading...' : 'Download PDF'}
                    </Button>
                </>
            }
        />
    )
}
