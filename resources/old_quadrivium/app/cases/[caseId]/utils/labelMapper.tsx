import { ReactNode } from 'react'
import { Question, QuestionOption } from '../../new/components/types'
import { questions } from '../../new/data/steps'

// Labels for sections
export const SECTION_LABELS: Record<string, string> = {
    'Research Sectors': 'Research Sectors',
    'Entity Type': 'Entity Type',
    'Material Format': 'Material Format',
    'Material Questions': 'Material Questions',
    'Research Description': 'Research Description'
}

// Labels for question codes
export const QUESTION_LABELS: Record<string, string> = {
    sectors: 'Research Sectors',
    entity_type: 'Entity Type',
    material_format: 'Material Format',
    material_nature: 'Material Nature',
    material_description: 'Material Description',
    special_features: 'Special Features',
    other_special_features: 'Other Special Features',
    acquisition_locations: 'Acquisition Location',
    acquisition_date: 'Acquisition Date',
    acquisition_conditions: 'Acquisition Conditions',
    indigenous_status: 'Indigenous Status',
    research_activities: 'Research Activities'
}

// Pre-defined label mappings as fallback
const SECTOR_LABELS: Record<string, string> = {
    pharmaceuticals: 'Pharmaceuticals',
    medical_devices: 'Medical Devices',
    food: 'Food',
    cosmetics: 'Cosmetics',
    breeding: 'Plant and animal breeding',
    biotechnology: 'Biotechnology'
}

const ENTITY_TYPE_LABELS: Record<string, string> = {
    private_for_profit: 'Private For Profit',
    private_not_for_profit: 'Private Not For Profit',
    public_non_governmental: 'Public Non-Governmental Entity',
    public_governmental: 'Public Governmental Entity'
}

const MATERIAL_FORMAT_LABELS: Record<string, string> = {
    physical: 'Physical Materials',
    digital: 'Digital Information'
}

const MATERIAL_NATURE_LABELS: Record<string, string> = {
    functional_units: 'Contains functional units of heredity',
    derivative: 'Derivative material',
    unknown: "I don't know"
}

const SPECIAL_FEATURES_LABELS: Record<string, string> = {
    pathogen: 'Known or potential pathogen',
    influenza_pandemic: 'Influenza with pandemic potential',
    pathogen_pandemic: 'Pathogen with pandemic potential',
    marine: 'Marine areas beyond jurisdiction',
    food_agriculture: 'Food and agricultural purposes',
    international_management: 'International management region',
    seasonal_influenza: 'Seasonal influenza',
    other: 'Other',
    not_applicable: 'Not applicable'
}

const ACQUISITION_CONDITIONS_LABELS: Record<string, string> = {
    in_situ: 'In Situ Conditions',
    ex_situ_origin: 'Ex Situ Conditions, in country of origin',
    ex_situ_other: 'Ex Situ Conditions, in other country than country of origin'
}

const INDIGENOUS_STATUS_LABELS: Record<string, string> = {
    indigenous: 'Yes, indigenous or very likely so',
    not_indigenous: 'No, not indigenous, or most likely not',
    multiple_countries:
        'Indigenous in this country, but very likely also in other countries',
    unknown: 'I do not know'
}

// Combine all label mappings
export const LABEL_MAPPINGS: Record<string, Record<string, string>> = {
    sectors: SECTOR_LABELS,
    entity_type: ENTITY_TYPE_LABELS,
    material_format: MATERIAL_FORMAT_LABELS,
    material_nature: MATERIAL_NATURE_LABELS,
    special_features: SPECIAL_FEATURES_LABELS,
    acquisition_conditions: ACQUISITION_CONDITIONS_LABELS,
    indigenous_status: INDIGENOUS_STATUS_LABELS
}

/**
 * Find the label for a given value in a specific question
 */
export function findLabelForValue(
    value: string | undefined,
    questionCode: string
): string {
    if (!value) return ''

    // Find the question in the questions array
    const question = questions.find((q: Question) => q.code === questionCode)
    if (question?.options?.options) {
        const option = question.options.options.find(
            (opt: QuestionOption) => opt.value === value
        )
        if (option) {
            return option.label
        }
    }

    // Check in our pre-defined label mappings as fallback
    if (LABEL_MAPPINGS[questionCode] && LABEL_MAPPINGS[questionCode][value]) {
        return LABEL_MAPPINGS[questionCode][value]
    }

    // For country names
    if (questionCode === 'acquisition_locations') {
        return value
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }

    return value // Return the original value if no label found
}

/**
 * Format a value based on its type and the question code
 */
export function formatAnswerValue(
    questionCode: string,
    value: any
): string | ReactNode | ReactNode[] {
    if (value === null || value === undefined) {
        return ''
    }

    // Handle array values (like checkboxes)
    if (Array.isArray(value)) {
        return value
            .map((item: string) => findLabelForValue(item, questionCode))
            .join(', ')
    }

    // Handle special date object
    if (questionCode === 'acquisition_date' && typeof value === 'object') {
        if (value.type === 'specific_date' && value.date) {
            const date = new Date(value.date)
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        } else if (value.type === 'unknown') {
            return "I don't know"
        } else {
            return value.type || ''
        }
    }

    // For simple string values
    if (typeof value === 'string') {
        return findLabelForValue(value, questionCode)
    }

    // Default fallback for other types
    return String(value)
}

// Helper function to get question text
export function getQuestionText(questionCode: string): string {
    // Find the question in the questions array
    const question = questions.find((q: Question) => q.code === questionCode)
    return question?.text || questionCode
}

// Helper function to get question options
export function getQuestionOptions(questionCode: string): QuestionOption[] {
    // Find the question in the questions array
    const question = questions.find((q: Question) => q.code === questionCode)
    return question?.options?.options || []
}

// Helper function to get question help text
export function getQuestionHelp(questionCode: string): string | undefined {
    // Find the question in the questions array
    const question = questions.find((q: Question) => q.code === questionCode)
    return question?.help
}

// Helper function to get section title for a question
export function getQuestionSectionTitle(questionCode: string): string {
    // Find the question in the questions array
    const question = questions.find((q: Question) => q.code === questionCode)
    return question?.sectionTitle || ''
}

// Helper function to get section description for a question
export function getQuestionSectionDescription(questionCode: string): string {
    // Find the question in the questions array
    const question = questions.find((q: Question) => q.code === questionCode)
    return question?.sectionDescription || ''
}

// Helper function to get question label
export function getQuestionLabel(questionCode: string): string {
    const text = getQuestionText(questionCode)
    const help = getQuestionHelp(questionCode)
    return help ? `${text}\n${help}` : text
}
