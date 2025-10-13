'use client'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    ArrowLeft,
    Download,
    Edit,
    MoreVertical,
    Printer,
    Share,
    Trash
} from 'lucide-react'

interface Document {
    id: string
    name: string
    type: string
    path: string
    dateAdded: string
    size: string
}

interface DocumentViewerProps {
    document: Document
    onBackClick: () => void
}

export const DocumentViewer = ({
    document,
    onBackClick
}: DocumentViewerProps) => {
    // Using paper-sample.pdf as the default document
    const pdfUrl = '/document-sample.pdf'

    return (
        <div className='flex flex-col h-full bg-white'>
            {/* Document header */}
            <div className='w-full bg-white border-b border-gray-200 flex items-center justify-between px-3 py-1.5 z-10 shadow-sm min-h-14'>
                <div className='flex items-center gap-3'>
                    <a
                        href='#'
                        onClick={(e) => {
                            e.preventDefault()
                            onBackClick()
                        }}
                        className='inline-flex items-center px-2 py-1 text-xs text-gray-700 hover:text-primary transition-colors rounded-md hover:bg-gray-100'
                    >
                        <ArrowLeft className='w-3.5 h-3.5 mr-1.5' />
                        Back to Documents
                    </a>
                    <h1 className='text-sm font-medium text-gray-800'>
                        {document.name}
                    </h1>
                </div>

                <div className='flex items-center space-x-2'>
                    <Button
                        variant='outline'
                        size='sm'
                        className='text-xs h-7 px-2 text-gray-700 border-gray-200 bg-white hover:bg-primary/[0.02] hover:text-gray-900 hover:border-primary/30'
                    >
                        <Download className='h-3.5 w-3.5 mr-1.5' />
                        Download
                    </Button>
                    <Button
                        variant='outline'
                        size='sm'
                        className='text-xs h-7 px-2 text-gray-700 border-gray-200 bg-white hover:bg-primary/[0.02] hover:text-gray-900 hover:border-primary/30'
                    >
                        <Share className='h-3.5 w-3.5 mr-1.5' />
                        Share
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='outline'
                                size='sm'
                                className='text-xs h-7 px-2 text-gray-700 border-gray-200 bg-white hover:bg-primary/[0.02] hover:text-gray-900 hover:border-primary/30'
                            >
                                <MoreVertical className='h-3.5 w-3.5' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-40'>
                            <DropdownMenuItem>
                                <Printer className='h-4 w-4 mr-2' />
                                Print
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Edit className='h-4 w-4 mr-2' />
                                Rename
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='text-red-600 hover:text-red-700 hover:bg-red-50 focus:bg-red-50 focus:text-red-700'>
                                <Trash className='h-4 w-4 mr-2' />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Document content */}
            <div className='flex-1 bg-gray-100'>
                <iframe
                    src={pdfUrl}
                    className='w-full h-full border-0'
                    title={document.name}
                />
            </div>
        </div>
    )
}
