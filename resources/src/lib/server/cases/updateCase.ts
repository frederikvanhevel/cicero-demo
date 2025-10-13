import db from '../db'

interface UpdateCaseData {
    answers?: Record<string, any>
    status?: 'SUBMITTED' | 'COMPLETED' | 'PROCESSING' | 'DRAFT' | 'FAILED'
    title?: string
    sector?: string
    result?: string
}

export async function updateCase(
    workspaceId: string,
    caseId: string,
    data: UpdateCaseData
) {
    return await db.case.update({
        where: {
            id: caseId,
            workspaceId
        },
        data
    })
}
