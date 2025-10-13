import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export type Status =
    | 'SUBMITTED'
    | 'COMPLETED'
    | 'PROCESSING'
    | 'DRAFT'
    | 'FAILED'

export function StatusBadge({ status }: { status: Status }) {
    if (status === 'PROCESSING') {
        return (
            <span className='inline-flex items-center gap-1 text-xs font-medium text-accent-blue-600'>
                <Loader2 className='h-2.5 w-2.5 animate-spin' />
                Processing
            </span>
        )
    }

    const styles = {
        DRAFT: 'bg-gray-50 text-gray-700 ring-gray-600/20',
        SUBMITTED: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
        COMPLETED: 'bg-green-50 text-green-700 ring-green-600/20',
        FAILED: 'bg-red-50 text-red-700 ring-red-600/20'
    }

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                styles[status]
            )}
        >
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
    )
}

export function SectorBadge({ sector }: { sector: string }) {
    return (
        <span className='inline-flex items-center rounded-md bg-primary/5 px-1.5 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10'>
            {sector.charAt(0).toUpperCase() + sector.slice(1)}
        </span>
    )
}

export function DateBadge({ date }: { date: Date | string }) {
    return (
        <span className='text-xs text-gray-500'>
            {typeof date === 'string' ? date : date.toLocaleDateString()}
        </span>
    )
}
