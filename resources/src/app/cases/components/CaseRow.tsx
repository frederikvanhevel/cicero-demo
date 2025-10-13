import { SectorBadge, StatusBadge } from '@/components/badges'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { format } from 'date-fns'
import { Download, MessageSquare, MoreHorizontal, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Case } from './CaseItem'

interface CaseRowProps {
    case: Case
    onDelete: (id: string) => void
    onDownload: (id: string) => void
    onView: (id: string) => void
    onComment: (id: string) => void
}

export function CaseRow({
    case: caseItem,
    onDelete,
    onDownload,
    onView,
    onComment
}: CaseRowProps) {
    const router = useRouter()
    const isCompleted = caseItem.status === 'COMPLETED'
    const caseNumber = caseItem.id.slice(-6)

    const handleRowClick = () => {
        if (isCompleted) {
            router.push(`/cases/${caseItem.id}`)
        }
    }

    return (
        <tr
            className={`${isCompleted ? 'cursor-pointer hover:bg-gray-50' : ''}`}
            onClick={handleRowClick}
        >
            <td className='px-6 py-4 text-gray-600 whitespace-nowrap'>
                #{caseNumber}
            </td>
            <td className='px-6 py-4'>
                <div className='font-medium text-gray-900 line-clamp-1'>
                    {caseItem.title || 'Untitled Case'}
                </div>
            </td>
            <td className='px-6 py-4'>
                <StatusBadge status={caseItem.status} />
            </td>
            <td className='px-6 py-4'>
                <SectorBadge sector={caseItem.sector || 'uncategorized'} />
            </td>
            <td className='px-6 py-4 text-gray-600 whitespace-nowrap'>
                {format(new Date(caseItem.createdAt), 'MMM d, yyyy')}
            </td>
            <td className='px-6 py-4 text-right'>
                <div
                    className='flex justify-end'
                    onClick={(e) => e.stopPropagation()}
                >
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='ghost'
                                className='h-8 w-8 p-0 text-gray-400 hover:text-primary hover:bg-gray-50'
                            >
                                <MoreHorizontal className='h-4 w-4' />
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
            </td>
        </tr>
    )
}
