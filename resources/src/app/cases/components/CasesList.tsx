'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { apiClient } from '@/lib/client/api'
import { ListCases } from '@/lib/server/cases/listCases'
import { useQuery } from '@tanstack/react-query'
import { Plus, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { CaseRow } from './CaseRow'

export default function CasesList() {
    const { data, isLoading } = useQuery({
        queryKey: ['cases'],
        queryFn: () => apiClient.get<ListCases>('/api/v1/cases'),
        refetchInterval: 1000
    })

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [selectedSector, setSelectedSector] = useState('all')

    // Action handlers
    const handleView = (id: string) => console.log('View:', id)
    const handleComment = (id: string) => console.log('Comment:', id)
    const handleDownload = (id: string) => console.log('Download:', id)
    const handleDelete = (id: string) => console.log('Delete:', id)

    // Filter cases by search query, status, and sector
    const filteredCases = data?.filter((memo) => {
        // Filter by search query
        const matchesSearch =
            searchQuery === '' ||
            (memo.title &&
                memo.title.toLowerCase().includes(searchQuery.toLowerCase()))

        // Filter by status
        const matchesStatus =
            selectedStatus === 'all' || memo.status === selectedStatus

        // Filter by sector
        const matchesSector =
            selectedSector === 'all' ||
            (memo.sector &&
                memo.sector.toLowerCase() === selectedSector.toLowerCase())

        return matchesSearch && matchesStatus && matchesSector
    })

    return (
        <div className='h-full flex flex-col'>
            {/* Custom header */}
            <div className='bg-white border-b border-gray-200 px-6 py-3'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-lg font-medium text-gray-900'>
                        My Cases
                    </h1>

                    <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-2'>
                            <div className='relative'>
                                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none' />
                                <Input
                                    type='search'
                                    placeholder='Search cases...'
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className='h-9 w-64 pl-10 text-sm'
                                />
                            </div>

                            <Select
                                value={selectedStatus}
                                onValueChange={setSelectedStatus}
                            >
                                <SelectTrigger className='h-9 text-sm border-gray-200'>
                                    <SelectValue placeholder='All Statuses' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='all'>
                                        All Statuses
                                    </SelectItem>
                                    <SelectItem value='DRAFT'>Draft</SelectItem>
                                    <SelectItem value='SUBMITTED'>
                                        Submitted
                                    </SelectItem>
                                    <SelectItem value='PROCESSING'>
                                        Processing
                                    </SelectItem>
                                    <SelectItem value='COMPLETED'>
                                        Completed
                                    </SelectItem>
                                    <SelectItem value='FAILED'>
                                        Failed
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={selectedSector}
                                onValueChange={setSelectedSector}
                            >
                                <SelectTrigger className='h-9 text-sm border-gray-200'>
                                    <SelectValue placeholder='All Sectors' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='all'>
                                        All Sectors
                                    </SelectItem>
                                    <SelectItem value='pharmaceuticals'>
                                        Pharmaceuticals
                                    </SelectItem>
                                    <SelectItem value='healthcare'>
                                        Healthcare
                                    </SelectItem>
                                    <SelectItem value='medical-devices'>
                                        Medical Devices
                                    </SelectItem>
                                    <SelectItem value='agriculture'>
                                        Agriculture
                                    </SelectItem>
                                    <SelectItem value='consumer-goods'>
                                        Consumer Goods
                                    </SelectItem>
                                    <SelectItem value='biotechnology'>
                                        Biotechnology
                                    </SelectItem>
                                    <SelectItem value='diagnostics'>
                                        Diagnostics
                                    </SelectItem>
                                    <SelectItem value='uncategorized'>
                                        Uncategorized
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Link href='/cases/new'>
                            <Button
                                variant='default'
                                size='sm'
                                className='h-9 px-4 text-sm bg-primary hover:bg-primary-light text-primary-foreground transition-colors'
                            >
                                <Plus className='h-4 w-4 mr-2' />
                                Create New Case
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Cases List */}
            <div className='flex-1 overflow-auto p-5 bg-gray-50'>
                <div className='mx-auto border rounded-lg overflow-hidden bg-white shadow-sm'>
                    <table className='w-full text-sm'>
                        <thead className='bg-gray-50 text-gray-700 border-b border-gray-200'>
                            <tr>
                                <th className='px-6 py-3 text-left font-medium'>
                                    ID
                                </th>
                                <th className='px-6 py-3 text-left font-medium'>
                                    Title
                                </th>
                                <th className='px-6 py-3 text-left font-medium'>
                                    Status
                                </th>
                                <th className='px-6 py-3 text-left font-medium'>
                                    Sector
                                </th>
                                <th className='px-6 py-3 text-left font-medium'>
                                    Created
                                </th>
                                <th className='px-6 py-3 text-right font-medium'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {filteredCases?.map((memo: any) => (
                                <CaseRow
                                    key={memo.id}
                                    case={memo}
                                    onView={handleView}
                                    onComment={handleComment}
                                    onDownload={handleDownload}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty state */}
                {(!filteredCases || filteredCases.length === 0) && (
                    <div className='text-center py-12 bg-white rounded-lg border border-dashed border-gray-300 shadow-sm'>
                        <p className='text-gray-500'>No cases found</p>
                    </div>
                )}
            </div>
        </div>
    )
}
