import db from '../db'

export async function getCase(workspaceId: string, caseId: string) {
    return await db.case.findUnique({
        where: {
            workspaceId,
            id: caseId
        }
    })
}
