import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

interface FiltersProps {
    selectedStatus: string
    onStatusChange: (value: string) => void
    onSectorChange: (value: string) => void
    onDateRangeChange: (value: string) => void
}

export function Filters({
    selectedStatus,
    onStatusChange,
    onSectorChange,
    onDateRangeChange
}: FiltersProps) {
    return (
        <Card>
            <CardContent className='pt-6'>
                <div className='space-y-6'>
                    <StatusFilter
                        selected={selectedStatus}
                        onChange={onStatusChange}
                    />
                    <SectorFilter onChange={onSectorChange} />
                    <DateRangeFilter onChange={onDateRangeChange} />
                </div>
            </CardContent>
        </Card>
    )
}

interface StatusFilterProps {
    selected: string
    onChange: (value: string) => void
}

export function StatusFilter({ selected, onChange }: StatusFilterProps) {
    return (
        <div className='space-y-4'>
            <h3 className='text-sm font-medium text-gray-900'>Status</h3>
            <RadioGroup value={selected} onValueChange={onChange}>
                <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='all' id='all' />
                    <Label htmlFor='all'>All</Label>
                </div>
                <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='draft' id='draft' />
                    <Label htmlFor='draft'>Draft</Label>
                </div>
                <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='final' id='final' />
                    <Label htmlFor='final'>Final</Label>
                </div>
            </RadioGroup>
        </div>
    )
}

interface SectorFilterProps {
    onChange: (value: string) => void
}

export function SectorFilter({ onChange }: SectorFilterProps) {
    return (
        <div className='space-y-4'>
            <h3 className='text-sm font-medium text-gray-900'>Sector</h3>
            <Select onValueChange={onChange}>
                <SelectTrigger>
                    <SelectValue placeholder='All sectors' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='all'>All sectors</SelectItem>
                    <SelectItem value='pharmaceuticals'>
                        Pharmaceuticals
                    </SelectItem>
                    <SelectItem value='food'>Food</SelectItem>
                    <SelectItem value='biotechnology'>Biotechnology</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

interface DateRangeFilterProps {
    onChange: (value: string) => void
}

export function DateRangeFilter({ onChange }: DateRangeFilterProps) {
    return (
        <div className='space-y-4'>
            <h3 className='text-sm font-medium text-gray-900'>Date Range</h3>
            <Select onValueChange={onChange}>
                <SelectTrigger>
                    <SelectValue placeholder='All time' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='all'>All time</SelectItem>
                    <SelectItem value='week'>Past week</SelectItem>
                    <SelectItem value='month'>Past month</SelectItem>
                    <SelectItem value='year'>Past year</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
