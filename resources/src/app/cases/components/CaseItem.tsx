import { SectorBadge, StatusBadge } from '@/components/badges'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import {
    Calendar,
    Download,
    Hash,
    MessageSquare,
    MoreVertical,
    Trash2
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export interface Case {
    id: string
    title?: string | null
    sector?: string | null
    createdAt: string
    status: 'SUBMITTED' | 'COMPLETED' | 'PROCESSING' | 'DRAFT'
}

interface CaseItemProps {
    case: Case
    onDelete: (id: string) => void
    onDownload: (id: string) => void
    onView: (id: string) => void
    onComment: (id: string) => void
}

export function CaseItem({
    case: caseItem,
    onDelete,
    onDownload,
    onView,
    onComment
}: CaseItemProps) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const isCompleted = caseItem.status === 'COMPLETED'
    const caseNumber = caseItem.id.slice(-6)

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('.click-stop')) return
        if (isCompleted) {
            router.push(`/cases/${caseItem.id}`)
        }
    }

    return (
        <Card
            className={cn(
                'relative overflow-hidden bg-white border-gray-200 transition-all duration-200 group',
                isCompleted &&
                    'cursor-pointer hover:border-primary/30 hover:shadow-md hover:scale-[1.01] hover:bg-primary/[0.02]',
                !isCompleted && 'hover:border-gray-300'
            )}
            onClick={handleCardClick}
        >
            <div className='absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/20 to-primary/5' />
            <CardContent className='pl-6 pr-4 py-4'>
                <div className='flex items-start justify-between gap-3'>
                    <div className='min-w-0 flex-1'>
                        <div className='flex items-center gap-2 mb-2 text-sm'>
                            <div className='flex items-center text-gray-500'>
                                <Hash className='h-3.5 w-3.5 opacity-70 mr-0.5' />
                                <span>{caseNumber}</span>
                            </div>
                            <span className='text-gray-200 mx-1'>•</span>
                            <StatusBadge status={caseItem.status} />
                        </div>
                        <div className='space-y-2'>
                            <h3 className='text-base font-medium text-gray-900 line-clamp-2 group-hover:text-gray-900'>
                                {caseItem.title ||
                                    'Memorandum on Access and Benefit-Sharing for Influenza Strains'}
                            </h3>
                            <div className='flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm'>
                                <SectorBadge
                                    sector={caseItem.sector || 'uncategorized'}
                                />
                                <div className='flex items-center text-sm text-gray-600'>
                                    <Calendar className='h-3.5 w-3.5 mr-1 flex-shrink-0' />
                                    <span className='text-nowrap'>
                                        {format(
                                            new Date(caseItem.createdAt),
                                            'MMM d, yyyy'
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`click-stop transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    >
                        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant='ghost'
                                    className='h-7 w-7 p-0 text-gray-400 hover:text-primary hover:bg-gray-50 data-[state=open]:bg-primary data-[state=open]:text-white'
                                >
                                    <MoreVertical className='h-4 w-4' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align='end'
                                className='w-[160px]'
                                sideOffset={4}
                            >
                                {!isCompleted && (
                                    <DropdownMenuItem
                                        onClick={() => onComment(caseItem.id)}
                                        className='cursor-pointer'
                                    >
                                        <MessageSquare className='mr-2 h-4 w-4' />
                                        Comment
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                    onClick={() => onDownload(caseItem.id)}
                                    className='cursor-pointer'
                                >
                                    <Download className='mr-2 h-4 w-4' />
                                    Download
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => onDelete(caseItem.id)}
                                    className='cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50'
                                >
                                    <Trash2 className='mr-2 h-4 w-4' />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
