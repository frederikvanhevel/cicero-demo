export enum QuestionType {
    TEXT = 'TEXT',
    TEXTAREA = 'TEXTAREA',
    SELECT = 'SELECT',
    MULTISELECT = 'MULTISELECT',
    DATE = 'DATE',
    RADIO = 'RADIO',
    RADIO_WITH_DATE = 'RADIO_WITH_DATE',
    CHECKBOX = 'CHECKBOX',
    COUNTRY_DATE_PAIRS = 'COUNTRY_DATE_PAIRS',
    FILE_UPLOAD = 'FILE_UPLOAD'
}

export interface CaseFormData {
    [key: string]: any
}

export interface QuestionOption {
    value: string
    label: string
    description?: string
    showDatePicker?: boolean
    allowCustomInput?: boolean
}

export interface CountryDatePair {
    country: string
    date?: Date
    dateInput?: string
}

export interface QuestionOptions {
    options?: QuestionOption[]
    placeholder?: string
    defaultValue?:
        | string
        | string[]
        | { type: string; date?: Date }
        | CountryDatePair[]
    countries?: { value: string; label: string }[]
}

export interface Question {
    id: string
    code: string
    text: string
    type: QuestionType
    required: boolean
    order: number
    sectionTitle: string
    sectionDescription: string
    help?: string
    options?: QuestionOptions
    validation?: {
        minLength?: number
        maxLength?: number
        custom?: (value: any) => string | true
    }
}
