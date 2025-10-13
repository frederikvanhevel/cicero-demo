import { Label } from '@/components/ui/label'
import {
    RadioGroupItem,
    RadioGroup as ShadcnRadioGroup
} from '@/components/ui/radio-group'
import { QuestionOption } from './types'

interface RadioGroupProps {
    options: QuestionOption[]
    value: string
    onChange: (value: string) => void
}

export function RadioGroup({ options, value, onChange }: RadioGroupProps) {
    return (
        <ShadcnRadioGroup value={value} onValueChange={onChange}>
            <div className='space-y-4'>
                {options.map((option) => (
                    <Label
                        key={option.value}
                        className='flex items-start space-x-3 p-4 border rounded-lg cursor-pointer'
                    >
                        <RadioGroupItem
                            value={option.value}
                            id={option.value}
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
                ))}
            </div>
        </ShadcnRadioGroup>
    )
}
