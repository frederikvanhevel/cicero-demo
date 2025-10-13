import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import {
    RadioGroupItem,
    RadioGroup as ShadcnRadioGroup
} from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { QuestionOption } from './types'

interface RadioWithDateProps {
    options: QuestionOption[]
    value: { type: string; date?: Date }
    onChange: (value: { type: string; date?: Date }) => void
    error?: string
}

export function RadioWithDate({
    options,
    value,
    onChange,
    error
}: RadioWithDateProps) {
    return (
        <div>
            <ShadcnRadioGroup
                value={value.type}
                onValueChange={(type) =>
                    onChange({
                        type,
                        date: type === 'specific_date' ? value.date : undefined
                    })
                }
            >
                <div className='space-y-4'>
                    {options.map((option) => (
                        <div key={option.value}>
                            <Label className='flex items-start space-x-3 p-4 border rounded-lg cursor-pointer'>
                                <RadioGroupItem
                                    value={option.value}
                                    id={option.value}
                                />
                                <div className='flex-grow'>
                                    <div className='font-medium'>
                                        {option.label}
                                    </div>
                                    {option.description && (
                                        <p className='text-sm text-muted-foreground mt-1'>
                                            {option.description}
                                        </p>
                                    )}
                                </div>
                            </Label>
                            {option.showDatePicker &&
                                value.type === option.value && (
                                    <div className='mt-2 ml-10'>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant='outline'
                                                    className={cn(
                                                        'w-[240px] pl-3 text-left font-normal',
                                                        !value.date &&
                                                            'text-muted-foreground'
                                                    )}
                                                >
                                                    <CalendarIcon className='mr-2 h-4 w-4' />
                                                    {value.date ? (
                                                        format(
                                                            value.date,
                                                            'PPP'
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className='w-auto p-0'
                                                align='start'
                                            >
                                                <Calendar
                                                    mode='single'
                                                    selected={value.date}
                                                    onSelect={(date) =>
                                                        onChange({
                                                            type: value.type,
                                                            date
                                                        })
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                )}
                        </div>
                    ))}
                </div>
            </ShadcnRadioGroup>
            {error && <FormMessage>{error}</FormMessage>}
        </div>
    )
}
