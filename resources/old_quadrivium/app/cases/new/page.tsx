'use client'

import { SubHeader } from '@/components/SubHeader'
import { apiClient } from '@/lib/client/api'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SinglePageForm } from './components/SinglePageForm'
import { CaseFormData } from './components/types'
import { questions } from './data/steps'

export default function CaseForm() {
    const router = useRouter()

    const handleSubmit = async (data: CaseFormData) => {
        await apiClient.post('/api/v1/cases', {
            answers: data
        })
        router.push('/cases')
    }

    return (
        <div className='min-h-screen bg-background flex flex-col'>
            <div className='sticky top-14 z-30 bg-white'>
                <SubHeader
                    title='New Case'
                    backLink={{
                        href: '/cases',
                        label: 'Back to Cases',
                        icon: <ArrowLeft className='w-3.5 h-3.5 mr-1.5' />
                    }}
                    centerTitle={true}
                    metadata={
                        <span className='text-sm text-muted-foreground/70'>
                            Please provide the required information
                        </span>
                    }
                />
            </div>
            <SinglePageForm questions={questions} onSubmit={handleSubmit} />
        </div>
    )
}
