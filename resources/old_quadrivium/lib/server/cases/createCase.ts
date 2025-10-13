import db from '../db'

export async function createCase(
    workspaceId: string,
    userId: string,
    answers: any
) {
    const createdCase = await db.case.create({
        data: {
            workspaceId,
            userId,
            answers,
            status: 'SUBMITTED'
        }
    })

    return createdCase
}
