import { countries } from 'countries-list'
import { CountryDatePair, Question, QuestionType } from '../components/types'

export const questions: Question[] = [
    {
        id: 'sectors',
        code: 'sectors',
        text: 'In what sector, or sectors, does the entity you are advising on ABS conduct its research and development?',
        type: QuestionType.CHECKBOX,
        required: true,
        order: 1,
        sectionTitle: 'Research Sectors',
        sectionDescription:
            'Select all sectors that apply to your research. This helps us identify the specific regulatory requirements and compliance obligations for your case.',
        help: 'Your selection will help identify specific regulatory requirements.',
        options: {
            options: [
                {
                    value: 'pharmaceuticals',
                    label: 'Pharmaceuticals',
                    description: 'vaccines and therapeutics'
                },
                {
                    value: 'medical_devices',
                    label: 'Medical Devices',
                    description: 'diagnostics, devices, hardware & software'
                },
                {
                    value: 'food',
                    label: 'Food',
                    description:
                        'FMCG, agriculture, nutritional supplements, botanicals'
                },
                {
                    value: 'cosmetics',
                    label: 'Cosmetics',
                    description:
                        'B2C brands and B2B suppliers including flavor and fragrance houses'
                },
                {
                    value: 'breeding',
                    label: 'Plant and animal breeding',
                    description: 'green and red biotech'
                },
                {
                    value: 'biotechnology',
                    label: 'Biotechnology',
                    description:
                        'industrial, computational, marine, environmental'
                }
            ]
        }
    },
    {
        id: 'entity_type',
        code: 'entity_type',
        text: 'Is the entity you are advising on ABS a Public Entity or Private Entity?',
        type: QuestionType.CHECKBOX,
        required: true,
        order: 1,
        sectionTitle: 'Entity Type',
        sectionDescription:
            'The type of entity determines which ABS regulations and requirements apply. Select the category that best describes your organization.',
        help: 'The type of entity affects the applicable regulations and requirements for ABS compliance.',
        options: {
            defaultValue: ['private_for_profit'],
            options: [
                {
                    value: 'private_for_profit',
                    label: 'Private For Profit',
                    description: 'i.e. small, medium or large enterprise'
                },
                {
                    value: 'private_not_for_profit',
                    label: 'Private Not For Profit',
                    description: 'e.g. philanthropic organization'
                },
                {
                    value: 'public_non_governmental',
                    label: 'Public Non-Governmental Entity',
                    description:
                        'e.g. Public Health Institute, Reference Laboratory, University, Museum, Collection'
                },
                {
                    value: 'public_governmental',
                    label: 'Public Governmental Entity',
                    description:
                        'e.g. National Focal Point, National Biodiversity Institute'
                }
            ]
        }
    },
    {
        id: 'material_format',
        code: 'material_format',
        text: 'Does your ABS query relate to physical materials or digital information?',
        type: QuestionType.CHECKBOX,
        required: true,
        order: 1,
        sectionTitle: 'Material Format',
        sectionDescription:
            'Different ABS regulations apply to physical materials versus digital information. Select the format that best describes your case.',
        help: 'Each format may be subject to different regulations.',
        options: {
            options: [
                {
                    value: 'physical',
                    label: 'Physical Materials',
                    description:
                        'e.g., coffee germplasm, viral samples, fragrance compounds'
                },
                {
                    value: 'digital',
                    label: 'Digital Information',
                    description:
                        'e.g., DNA sequences, amino acid sequences, protein folding information'
                }
            ]
        }
    },
    {
        id: 'material_nature',
        code: 'material_nature',
        text: 'Does the physical material contain, or does the information relate to, functional units of heredity?',
        type: QuestionType.RADIO,
        required: true,
        order: 1,
        sectionTitle: 'Material Questions',
        sectionDescription:
            'Functional units of heredity means that your material or information contains DNA or RNA, even in part.  Derivatives is any does not contain DNA or RNA, such as proteins or metabolites, as well as information relating to it.',
        help: 'This helps determine which ABS protocols apply to your case.',
        options: {
            options: [
                {
                    value: 'functional_units',
                    label: 'Contains functional units of heredity',
                    description:
                        'The material contains, or the information relates to, functional units of heredity (e.g., DNA)'
                },
                {
                    value: 'derivative',
                    label: 'Derivative material',
                    description:
                        'The material does not contain functional units of heredity and can be described as a derivative (a naturally occurring biochemical compound resulting from genetic expression or metabolism)'
                },
                {
                    value: 'unknown',
                    label: "I don't know",
                    description:
                        'I am not sure whether the material contains functional units of heredity or is a derivative material'
                }
            ]
        }
    },
    {
        id: 'material_description',
        code: 'material_description',
        text: 'Please describe the nature of the material as specifically as possible.',
        type: QuestionType.TEXTAREA,
        required: true,
        order: 2,
        sectionTitle: 'Material Questions',
        sectionDescription:
            'Please describe the nature of the physical material and or digital information as specifically as possible.',
        help: 'Include details about the source, composition, and any specific characteristics of the material. This input is essential: the more specifics you add, the more informative the resulting memorandum will be.',
        validation: {
            minLength: 5
        },
        options: {
            placeholder: 'Provide a detailed description of the material...'
        }
    },
    {
        id: 'special_features',
        code: 'special_features',
        text: 'Are there any special features of the material?',
        type: QuestionType.CHECKBOX,
        required: false,
        order: 3,
        sectionTitle: 'Material Questions',
        sectionDescription:
            'Understanding the nature of your material is crucial for ABS compliance. The following questions help us determine the appropriate protocols and requirements.',
        help: 'Select all that apply.',
        options: {
            options: [
                {
                    value: 'pathogen',
                    label: 'Known or potential pathogen',
                    description:
                        'The material is known or potential human, plant or veterinary pathogen'
                },
                {
                    value: 'influenza_pandemic',
                    label: 'Influenza with pandemic potential',
                    description:
                        'The material is an influenza sample with pandemic potential'
                },
                {
                    value: 'pathogen_pandemic',
                    label: 'Pathogen with pandemic potential',
                    description:
                        'The material is pathogen with pandemic potential'
                },
                {
                    value: 'marine',
                    label: 'Marine areas beyond jurisdiction',
                    description:
                        'The material has been obtained from marine areas beyond national jurisdiction'
                },
                {
                    value: 'food_agriculture',
                    label: 'Food and agricultural purposes',
                    description:
                        'The material will be used for food and agricultural purposes'
                },
                {
                    value: 'international_management',
                    label: 'International management region',
                    description:
                        'The material was obtained from a region of international management (e.g., Antarctica, Lake Tanganyika)'
                },
                {
                    value: 'seasonal_influenza',
                    label: 'Seasonal influenza',
                    description:
                        'The material is a seasonal influenza virus sample'
                },
                {
                    value: 'other',
                    label: 'Other',
                    description: ''
                },
                {
                    value: 'not_applicable',
                    label: 'Not applicable',
                    description: ''
                }
            ]
        }
    },
    {
        id: 'other_special_features',
        code: 'other_special_features',
        text: 'What other special features or characteristics does the material have?',
        type: QuestionType.TEXTAREA,
        required: false,
        order: 3.1,
        sectionTitle: 'Material Questions',
        sectionDescription:
            'Understanding the nature of your material is crucial for ABS compliance. The following questions help us determine the appropriate protocols and requirements.',
        help: 'Provide any additional characteristics or features of the material that may be relevant for ABS compliance.\nFor instance, describe the public health risk that may be posed by the pathogen. Describe that the material may be highly transient across oceans.',
        options: {
            placeholder:
                'If none of the above apply, please specify any other special features or characteristics of the material.'
        }
    },
    {
        id: 'acquisition_locations',
        code: 'acquisition_locations',
        text: 'Where was the material physically acquired? For each country, please specify the acquisition date.',
        type: QuestionType.COUNTRY_DATE_PAIRS,
        required: true,
        order: 4,
        sectionTitle: 'Material Questions',
        sectionDescription:
            'Understanding the nature of your material is crucial for ABS compliance. The following questions help us determine the appropriate protocols and requirements.',
        help: 'Add each country where the material was acquired and specify the acquisition date for each country.',
        validation: {
            custom: (value: CountryDatePair[] | undefined) => {
                if (!value || value.length === 0) {
                    return 'Please add at least one country'
                }
                if (value.some((pair) => !pair.country)) {
                    return 'Please select a country for each entry'
                }
                if (value.some((pair) => !pair.date)) {
                    return 'Please specify an acquisition date for each country'
                }
                return true
            }
        },
        options: {
            countries: Object.entries(countries).map(([code, country]) => ({
                value: country.name.toLowerCase().replace(/\s+/g, '-'),
                label: country.name
            })),
            defaultValue: []
        }
    },
    {
        id: 'acquisition_conditions',
        code: 'acquisition_conditions',
        text: 'Under what conditions was the material physically acquired?',
        type: QuestionType.RADIO,
        required: true,
        order: 7,
        sectionTitle: 'Material Questions',
        sectionDescription:
            'Understanding the nature of your material is crucial for ABS compliance. The following questions help us determine the appropriate protocols and requirements.',
        help: '"In-situ conditions" means conditions where genetic resources exist within ecosystems and natural habitats. "Ex-situ conditions" means the biological resources are held outside their natural habitats.',
        options: {
            options: [
                {
                    value: 'in_situ',
                    label: 'In Situ Conditions'
                },
                {
                    value: 'ex_situ_origin',
                    label: 'Ex Situ Conditions, in country of origin'
                },
                {
                    value: 'ex_situ_other',
                    label: 'Ex Situ Conditions, in other country than country of origin'
                }
            ]
        }
    },
    {
        id: 'indigenous_status',
        code: 'indigenous_status',
        text: 'To the best of your knowledge, is the resource native or indigenous to the jurisdiction where it was physically acquired?',
        type: QuestionType.RADIO,
        required: true,
        order: 8,
        sectionTitle: 'Material Questions',
        sectionDescription:
            'Understanding the nature of your material is crucial for ABS compliance. The following questions help us determine the appropriate protocols and requirements.',
        help: 'Indigenous biological resources refer to plants, animals, microorganisms, or other organisms, including their genetic material and derivatives, that naturally occur in a specific region, ecosystem, or country without proactive human intervention to introduce them. These resources include species that historically existed within the territory, those that have extended their range naturally into the area, or (highly) migratory species that periodically inhabit the region.',
        options: {
            options: [
                {
                    value: 'indigenous',
                    label: 'Yes, indigenous or very likely so'
                },
                {
                    value: 'not_indigenous',
                    label: 'No, not indigenous, or most likely not'
                },
                {
                    value: 'multiple_countries',
                    label: 'Indigenous in this country, but very likely also in other countries'
                },
                {
                    value: 'unknown',
                    label: 'I do not know'
                }
            ]
        }
    },
    {
        id: 'research_activities',
        code: 'research_activities',
        text: 'What research and development activities will be or have been carried out with the material?',
        type: QuestionType.TEXTAREA,
        required: true,
        order: 1,
        sectionTitle: 'Research Description',
        sectionDescription:
            'Provide detailed information about your research activities to help us assess the appropriate ABS requirements and protocols for your case.',
        help: 'Include information about specific techniques, methodologies, and expected outcomes.',
        options: {
            placeholder:
                'Provide detailed information about your research activities...'
        },
        validation: {
            minLength: 10
        }
    },
    {
        id: 'additional_documents',
        code: 'additional_documents',
        text: 'Upload any supporting documentation',
        type: QuestionType.FILE_UPLOAD,
        required: false,
        order: 13,
        sectionTitle: 'Additional Documents',
        sectionDescription:
            'You can upload additional documents to support your case assessment. This might include research protocols, permits, or other relevant documentation.\n\nAccepted file types\n• PDF documents\n• Word documents\n• Image files (PNG, JPG)',
        options: {
            placeholder: 'Upload your documents here'
        }
    }
]
