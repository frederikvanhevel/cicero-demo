import { getAuth } from '@/lib/server/auth/getAuth'
import { getCase } from '@/lib/server/cases/getCase'
import { notFound } from 'next/navigation'
import { Memorandum } from './components/Memorandum'

export default async function MemorandumPage({
    params
}: {
    params: Promise<{ caseId: string }>
}) {
    const { caseId } = await params
    const { user } = await getAuth({ ensureSignedIn: true })
    const memorandum = await getCase(user!.workspaceId, caseId)

    if (!memorandum) {
        return notFound()
    }

    return (
        <Memorandum
            title={memorandum.title || 'Untitled'}
            sector={memorandum.sector || 'uncategorized'}
            status={memorandum.status}
            content={memorandum.result || ''}
            date={memorandum.createdAt}
            answers={
                memorandum.answers
                    ? (memorandum.answers as Record<string, any>)
                    : {}
            }
            suggestedQuestions={[
                'What is the process for applying for a permit?',
                'What are the sanctions for non compliance?'
            ]}
        />
    )
}
