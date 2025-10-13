import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { QuestionOption } from './types'

interface CheckboxGroupProps {
    options: QuestionOption[]
    value: string[]
    onChange: (value: string[]) => void
    renderDependentField?: (optionValue: string) => React.ReactNode
}

export function CheckboxGroup({
    options,
    value,
    onChange,
    renderDependentField
}: CheckboxGroupProps) {
    const handleChange = (optionValue: string, checked: boolean) => {
        if (optionValue === 'not_applicable' && checked) {
            // If "Not applicable" is selected, unselect everything else
            onChange(['not_applicable'])
        } else if (checked && value.includes('not_applicable')) {
            // If any other option is selected and "Not applicable" was selected, remove it
            onChange([optionValue])
        } else if (checked) {
            onChange([...value, optionValue])
        } else {
            onChange(value.filter((v) => v !== optionValue))
        }
    }

    return (
        <div className='space-y-4'>
            {options.map((option) => (
                <div key={option.value}>
                    <Label className='flex items-start space-x-3 p-4 border rounded-lg cursor-pointer'>
                        <Checkbox
                            checked={value.includes(option.value)}
                            onCheckedChange={(checked) =>
                                handleChange(option.value, !!checked)
                            }
                        />
                        <div>
                            <div className='font-medium'>{option.label}</div>
                            {option.description && (
                                <p className='text-sm text-muted-foreground mt-1'>
                                    {option.description}
                                </p>
                            )}
                        </div>
                    </Label>
                    {renderDependentField && value.includes(option.value) && (
                        <div className='mt-2 ml-12'>
                            {renderDependentField(option.value)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
