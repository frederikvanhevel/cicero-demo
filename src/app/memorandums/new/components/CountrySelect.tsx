'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useMemo } from 'react'
import Select, { GroupBase } from 'react-select'
import countryList from 'react-select-country-list'

type Country = {
    label: string
    value: string
}

interface CountryOption {
    value: string
    label: string
    flag: string
}

interface CountrySelectProps {
    value: string[]
    onChange: (value: string[]) => void
    placeholder?: string
    className?: string
}

export function CountrySelect({
    value = [],
    onChange,
    placeholder,
    className
}: CountrySelectProps) {
    const options = useMemo(() => {
        const countries = countryList().getData()
        return countries.map((country: Country) => ({
            value: country.label,
            label: country.label,
            flag: `https://flagcdn.com/16x12/${country.value.toLowerCase()}.png`
        }))
        // .sort((a: CountryOption, b: CountryOption) =>
        //     a.label.toLowerCase().localeCompare(b.label.toLowerCase())
        // )
    }, [])

    console.log(options)

    const selectedOptions = useMemo(() => {
        return options.filter((option) => value.includes(option.value))
        // .sort((a: CountryOption, b: CountryOption) =>
        //     a.label.toLowerCase().localeCompare(b.label.toLowerCase())
        // )
    }, [options, value])

    const handleRemove = (countryName: string) => {
        onChange(value.filter((v) => v !== countryName))
    }

    const customStyles = {
        option: (provided: Record<string, unknown>) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px'
        })
    }

    const formatOptionLabel = ({ label, flag }: CountryOption) => (
        <div className='flex items-center gap-2'>
            <img
                src={flag}
                alt=''
                className='w-4 h-3 object-cover rounded-sm'
            />
            <span>{label}</span>
        </div>
    )

    return (
        <div className='space-y-2'>
            <div className='flex flex-wrap gap-1 min-h-[28px]'>
                {selectedOptions.map((option) => (
                    <Badge
                        key={option.value}
                        variant='secondary'
                        className='flex items-center gap-1 py-1 px-2'
                    >
                        <img
                            src={option.flag}
                            alt=''
                            className='w-4 h-3 object-cover rounded-sm'
                        />
                        {option.label}
                        <button
                            onClick={() => handleRemove(option.value)}
                            className='ml-1 hover:bg-gray-200 rounded-full p-0.5'
                        >
                            <X className='h-3 w-3' />
                        </button>
                    </Badge>
                ))}
            </div>
            <Select<CountryOption, true, GroupBase<CountryOption>>
                isMulti
                options={options}
                value={selectedOptions}
                onChange={(newValue) => {
                    onChange((newValue || []).map((v) => v.value))
                }}
                placeholder={placeholder || 'Select countries...'}
                formatOptionLabel={formatOptionLabel}
                styles={customStyles}
                className={cn('react-select-container', className)}
                classNamePrefix='react-select'
                menuPosition='fixed'
            />
        </div>
    )
}
