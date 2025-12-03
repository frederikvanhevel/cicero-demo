'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { countries } from 'countries-list'
import getEmojiFlag from 'country-flag-icons/unicode'
import { format } from 'date-fns'
import { CalendarIcon, Plus, X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { IMaskInput } from 'react-imask'
import { MultiSelectQuestion } from './MultiSelectQuestion'
import { CountryDatePair, Question, QuestionType } from './types'

interface QuestionInputProps {
    question: Question
    value: unknown
    onChange: (value: unknown) => void
    showValidation?: boolean
}

// Function to get country code from country name
const getCountryCodeFromName = (countryName: string): string => {
    // Convert slug to name format (e.g., "united-arab-emirates" -> "United Arab Emirates")
    const normalizedName = countryName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

    // Find country code by matching name
    const countryEntry = Object.entries(countries).find(
        ([_code, country]) => country.name === normalizedName
    )

    return countryEntry ? countryEntry[0] : 'UN' // Return UN as fallback
}

const useAutoGrow = (value: string) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const adjustHeight = useCallback(() => {
        const textarea = textareaRef.current
        if (!textarea) return

        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
    }, [])

    useEffect(() => {
        adjustHeight()
    }, [value, adjustHeight])

    return textareaRef
}

export function QuestionInput({
    question,
    value,
    onChange,
    showValidation
}: QuestionInputProps) {
    const textareaRef = useAutoGrow((value as string) || '')

    switch (question.type) {
        case QuestionType.TEXT:
            return (
                <Input
                    placeholder={question.options?.placeholder}
                    value={(value as string) || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className={showValidation ? 'border-red-500' : ''}
                />
            )

        case QuestionType.TEXTAREA:
            return (
                <Textarea
                    ref={textareaRef}
                    placeholder={question.options?.placeholder}
                    value={(value as string) || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className={`min-h-[60px] ${showValidation ? 'border-red-500' : ''}`}
                />
            )

        case QuestionType.CHECKBOX:
            return (
                <div
                    className={`space-y-2 ${showValidation ? 'border border-red-500 rounded-md p-2' : ''}`}
                >
                    {question.options?.options?.map((option) => (
                        <div key={option.value} className='space-y-2'>
                            <label
                                className='flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-100 cursor-pointer group'
                            >
                                <Checkbox
                                    id={option.value}
                                    checked={
                                        Array.isArray(value) &&
                                        value.some((v: string | { value: string; customInput?: string }) =>
                                            typeof v === 'string' ? v === option.value : v.value === option.value
                                        )
                                    }
                                    onCheckedChange={(checked) => {
                                        const newValue = Array.isArray(value)
                                            ? [...value]
                                            : []
                                        if (checked) {
                                            if (option.allowCustomInput) {
                                                newValue.push({ value: option.value, customInput: '' })
                                            } else {
                                                newValue.push(option.value)
                                            }
                                        } else {
                                            const index = newValue.findIndex((v: string | { value: string; customInput?: string }) =>
                                                typeof v === 'string' ? v === option.value : v.value === option.value
                                            )
                                            if (index > -1) {
                                                newValue.splice(index, 1)
                                            }
                                        }
                                        onChange(newValue)
                                    }}
                                    className={
                                        showValidation ? 'border-red-500' : ''
                                    }
                                />
                                <span className='text-sm font-normal leading-relaxed flex-1'>
                                    {option.label}
                                </span>
                            </label>
                            {option.allowCustomInput &&
                                Array.isArray(value) &&
                                value.some((v: string | { value: string; customInput?: string }) =>
                                    typeof v === 'string' ? v === option.value : v.value === option.value
                                ) && (
                                <div className='pl-9'>
                                    <Input
                                        placeholder='Please specify...'
                                        value={
                                            (() => {
                                                const item = value.find((v: string | { value: string; customInput?: string }) =>
                                                    typeof v === 'string' ? v === option.value : v.value === option.value
                                                )
                                                return typeof item === 'object' ? item.customInput || '' : ''
                                            })()
                                        }
                                        onChange={(e) => {
                                            const newValue = [...value]
                                            const index = newValue.findIndex((v: string | { value: string; customInput?: string }) =>
                                                typeof v === 'string' ? v === option.value : v.value === option.value
                                            )
                                            if (index > -1) {
                                                newValue[index] = { value: option.value, customInput: e.target.value }
                                            }
                                            onChange(newValue)
                                        }}
                                        className='text-sm'
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )

        case QuestionType.RADIO:
            return (
                <RadioGroup
                    value={value as string}
                    onValueChange={onChange}
                    required={question.required}
                    className={`space-y-2 ${showValidation ? 'border-red-500' : ''}`}
                >
                    {question.options?.options?.map((option) => (
                        <label
                            key={option.value}
                            className='flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-100 cursor-pointer group'
                        >
                            <RadioGroupItem
                                value={option.value}
                                id={option.value}
                            />
                            <span className='text-sm font-normal leading-relaxed flex-1'>
                                {option.label}
                            </span>
                        </label>
                    ))}
                </RadioGroup>
            )

        case QuestionType.SELECT:
            return (
                <Select value={(value as string) || ''} onValueChange={onChange}>
                    <SelectTrigger
                        className={showValidation ? 'border-red-500' : ''}
                    >
                        <SelectValue
                            placeholder={
                                question.options?.placeholder ||
                                'Select an option'
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {question.options?.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )

        case QuestionType.MULTISELECT:
            return (
                <MultiSelectQuestion
                    question={question}
                    value={(value as string[]) || []}
                    onChange={onChange}
                    error={
                        showValidation ? 'This field is required' : undefined
                    }
                />
            )

        case QuestionType.DATE:
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant='outline'
                            className={`w-full max-w-[280px] justify-start text-left font-normal h-9 ${showValidation ? 'border-red-500' : ''}`}
                        >
                            <CalendarIcon className='mr-2 h-4 w-4 text-muted-foreground' />
                            {value ? (
                                <span className='text-foreground'>{format(value as Date, 'PPP')}</span>
                            ) : (
                                <span className='text-muted-foreground'>
                                    {question.options?.placeholder ||
                                        'Select a date'}
                                </span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                            mode='single'
                            selected={value as Date}
                            onSelect={onChange}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            )

        case QuestionType.RADIO_WITH_DATE:
            return (
                <div className='space-y-4'>
                    <RadioGroup
                        value={(value as { type?: string; date?: Date })?.type || ''}
                        onValueChange={(type) => {
                            onChange({ ...(value as { type?: string; date?: Date }), type })
                        }}
                        required={question.required}
                        className={showValidation ? 'border-red-500' : ''}
                    >
                        {question.options?.options?.map((option) => (
                            <div key={option.value} className='space-y-2'>
                                <div className='flex items-center space-x-2'>
                                    <RadioGroupItem
                                        value={option.value}
                                        id={option.value}
                                    />
                                    <Label
                                        htmlFor={option.value}
                                        className='text-sm'
                                    >
                                        {option.label}
                                    </Label>
                                </div>
                                {option.showDatePicker &&
                                    (value as { type?: string; date?: Date })?.type === option.value && (
                                        <div className='pl-6'>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant='outline'
                                                        className={`w-[240px] justify-start text-left font-normal ${showValidation ? 'border-red-500' : ''}`}
                                                    >
                                                        <CalendarIcon className='mr-2 h-4 w-4' />
                                                        {(value as { type?: string; date?: Date })?.date ? (
                                                            format(
                                                                (value as { type?: string; date?: Date }).date!,
                                                                'PPP'
                                                            )
                                                        ) : (
                                                            <span className='text-muted-foreground'>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className='w-auto p-0'
                                                    align='start'
                                                >
                                                    <Calendar
                                                        mode='single'
                                                        selected={(value as { type?: string; date?: Date })?.date}
                                                        onSelect={(date) =>
                                                            onChange({
                                                                ...(value as { type?: string; date?: Date }),
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
                    </RadioGroup>
                </div>
            )

        case QuestionType.COUNTRY_DATE_PAIRS:
            const pairs = (value as CountryDatePair[]) || []
            return (
                <div className='space-y-4'>
                    {pairs.map((pair: CountryDatePair, index: number) => (
                        <div key={index} className='flex items-start gap-4'>
                            <div className='flex-[2]'>
                                <Select
                                    value={pair.country || ''}
                                    onValueChange={(country: string) => {
                                        const newPairs = [...pairs]
                                        newPairs[index] = { ...pair, country }
                                        // Filter out any pairs with empty countries
                                        const filteredPairs = newPairs.filter(
                                            (p) => p.country
                                        )
                                        onChange(filteredPairs)
                                    }}
                                >
                                    <SelectTrigger
                                        className={
                                            showValidation
                                                ? 'border-red-500'
                                                : ''
                                        }
                                    >
                                        <SelectValue placeholder='Select a country'>
                                            {pair.country && (
                                                <>
                                                    {getEmojiFlag(
                                                        getCountryCodeFromName(
                                                            pair.country
                                                        )
                                                    )}{' '}
                                                    {pair.country
                                                        .split('-')
                                                        .map(
                                                            (word) =>
                                                                word
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                word.slice(1)
                                                        )
                                                        .join(' ')}
                                                </>
                                            )}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[
                                            ...(question.options?.countries ||
                                                [])
                                        ]
                                            .sort((a, b) =>
                                                a.label.localeCompare(b.label)
                                            )
                                            .map((country) => (
                                                <SelectItem
                                                    key={country.value}
                                                    value={country.value}
                                                >
                                                    {getEmojiFlag(
                                                        getCountryCodeFromName(
                                                            country.value
                                                        )
                                                    )}{' '}
                                                    {country.label}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='flex-0'>
                                <div className='flex gap-2 w-[240px]'>
                                    <IMaskInput
                                        type='text'
                                        mask='00.00.0000'
                                        value={pair.dateInput || ''}
                                        onAccept={(dateInput: string) => {
                                            const newPairs = [...pairs]
                                            let date: Date | undefined =
                                                undefined

                                            if (
                                                dateInput.match(
                                                    /^\d{2}\.\d{2}\.\d{4}$/
                                                )
                                            ) {
                                                const [day, month, year] =
                                                    dateInput.split('.')
                                                date = new Date(
                                                    `${year}-${month}-${day}`
                                                )
                                                if (isNaN(date.getTime())) {
                                                    date = undefined
                                                }
                                            }

                                            newPairs[index] = {
                                                ...pair,
                                                dateInput,
                                                date
                                            }
                                            onChange(newPairs)
                                        }}
                                        placeholder='DD.MM.YYYY'
                                        className={`flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${showValidation ? 'border-red-500' : ''}`}
                                    />
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant='outline'
                                                size='icon'
                                                className={
                                                    showValidation
                                                        ? 'border-red-500'
                                                        : ''
                                                }
                                            >
                                                <CalendarIcon className='h-4 w-4' />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className='w-auto p-0'
                                            align='start'
                                        >
                                            <Calendar
                                                mode='single'
                                                selected={pair.date}
                                                onSelect={(date) => {
                                                    const newPairs = [...pairs]
                                                    newPairs[index] = {
                                                        ...pair,
                                                        date,
                                                        dateInput: date
                                                            ? format(
                                                                  date,
                                                                  'dd.MM.yyyy'
                                                              )
                                                            : ''
                                                    }
                                                    onChange(newPairs)
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <Button
                                type='button'
                                variant='ghost'
                                size='icon'
                                onClick={() => {
                                    const newPairs = [...pairs]
                                    newPairs.splice(index, 1)
                                    onChange(newPairs)
                                }}
                            >
                                <X className='h-4 w-4' />
                            </Button>
                        </div>
                    ))}
                    <Button
                        type='button'
                        variant='outline'
                        onClick={() => {
                            const newPairs = [
                                ...pairs,
                                { country: '', dateInput: '', date: undefined }
                            ]
                            onChange(newPairs)
                        }}
                    >
                        <Plus className='h-4 w-4' />
                        Add Country
                    </Button>
                </div>
            )

        case QuestionType.FILE_UPLOAD:
            return (
                <div
                    className={`border-2 border-dashed rounded-lg p-8 ${showValidation ? 'border-red-500 bg-red-50/30' : 'border-border bg-muted/20'} hover:border-primary hover:bg-muted/40 transition-all duration-200 cursor-pointer group`}
                >
                    <div className='flex flex-col items-center justify-center space-y-4'>
                        <div className='h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-200'>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                className='text-primary'
                            >
                                <path
                                    d='M12 16.5V6.5M12 6.5L7.5 11M12 6.5L16.5 11'
                                    stroke='currentColor'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                <path
                                    d='M3 15.8V19.6C3 20.9255 4.07452 22 5.4 22H18.6C19.9255 22 21 20.9255 21 19.6V15.8'
                                    stroke='currentColor'
                                    strokeWidth='1.5'
                                    strokeLinecap='round'
                                />
                            </svg>
                        </div>
                        <div className='text-center space-y-1'>
                            <h3 className='text-sm font-semibold text-foreground'>
                                Upload documents
                            </h3>
                            <p className='text-xs text-muted-foreground'>
                                Drag and drop files here, or click to browse
                            </p>
                            <p className='text-xs text-muted-foreground'>
                                Supports PDF, DOC, DOCX up to 10MB
                            </p>
                        </div>
                        <Button
                            variant='outline'
                            size='sm'
                            className='mt-2 h-8 cursor-pointer'
                            onClick={(e) => {
                                e.stopPropagation()
                                // This would normally trigger a file input click
                                console.log('Select files clicked')
                            }}
                        >
                            Browse Files
                        </Button>
                    </div>
                </div>
            )

        default:
            return null
    }
}
