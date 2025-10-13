'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, X } from 'lucide-react'
import * as React from 'react'

export interface Option {
    value: string
    label: string
    description?: string
}

interface MultiSelectProps {
    options: Option[]
    selected: string[]
    onChange: (values: string[]) => void
    placeholder?: string
    className?: string
}

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = 'Select items...',
    className
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)

    const handleUnselect = (item: string) => {
        onChange(selected.filter((i) => i !== item))
    }

    // Get label from value
    const getLabel = (value: string) => {
        return options.find((option) => option.value === value)?.label || value
    }

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <div className='flex flex-wrap gap-1'>
                {selected.map((item) => (
                    <Badge
                        key={item}
                        variant='secondary'
                        className='flex items-center gap-1'
                    >
                        {getLabel(item)}
                        <button
                            className='rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleUnselect(item)
                                }
                            }}
                            onMouseDown={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                            }}
                            onClick={() => handleUnselect(item)}
                        >
                            <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                        </button>
                    </Badge>
                ))}
            </div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={open}
                        className='w-full justify-between'
                    >
                        {placeholder}
                        <span className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0'>
                    <Command>
                        <CommandInput placeholder='Search...' className='h-9' />
                        <CommandEmpty>No item found.</CommandEmpty>
                        <CommandGroup className='max-h-64 overflow-auto'>
                            {[...options]
                                .sort((a, b) => a.label.localeCompare(b.label))
                                .map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            onChange(
                                                selected.includes(option.value)
                                                    ? selected.filter(
                                                          (item) =>
                                                              item !==
                                                              option.value
                                                      )
                                                    : [
                                                          ...selected,
                                                          option.value
                                                      ]
                                            )
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                selected.includes(option.value)
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                        <div>
                                            <div>{option.label}</div>
                                            {option.description && (
                                                <div className='text-sm text-muted-foreground'>
                                                    {option.description}
                                                </div>
                                            )}
                                        </div>
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
