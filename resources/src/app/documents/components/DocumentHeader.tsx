'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Filter, Grid, List, Plus, Search } from 'lucide-react'

interface DocumentHeaderProps {
    searchQuery: string
    onSearchChange: (value: string) => void
    viewMode: 'list' | 'grid'
    onViewModeChange: (mode: 'list' | 'grid') => void
}

export function DocumentHeader({
    searchQuery,
    onSearchChange,
    viewMode,
    onViewModeChange
}: DocumentHeaderProps) {
    return (
        <div className='w-full bg-white border-b border-gray-200 flex items-center px-6 py-3'>
            <h1 className='text-lg font-medium text-gray-900'>Documents</h1>
            <div className='flex items-center gap-4 ml-auto'>
                <div className='flex items-center gap-2'>
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none' />
                        <Input
                            type='search'
                            placeholder='Search documents...'
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className='h-9 w-64 pl-10 text-sm'
                        />
                    </div>
                    <Button
                        variant='outline'
                        size='sm'
                        className='h-9 text-sm border-gray-200'
                    >
                        <Filter className='h-4 w-4 mr-2' />
                        Filter
                    </Button>
                    <div className='flex border border-gray-200 rounded-md overflow-hidden'>
                        <button
                            className={cn(
                                'flex items-center justify-center p-1 h-9 w-9',
                                viewMode === 'list'
                                    ? 'bg-accent-blue-50 text-accent-blue-700'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            )}
                            onClick={() => onViewModeChange('list')}
                        >
                            <List className='h-4 w-4' />
                        </button>
                        <button
                            className={cn(
                                'flex items-center justify-center p-1 h-9 w-9',
                                viewMode === 'grid'
                                    ? 'bg-accent-blue-50 text-accent-blue-700'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            )}
                            onClick={() => onViewModeChange('grid')}
                        >
                            <Grid className='h-4 w-4' />
                        </button>
                    </div>
                </div>
                <Button
                    variant='default'
                    size='sm'
                    className='h-9 px-4 text-sm bg-primary hover:bg-primary-light text-primary-foreground transition-colors'
                >
                    <Plus className='h-4 w-4 mr-2' />
                    Upload Document
                </Button>
            </div>
        </div>
    )
}
