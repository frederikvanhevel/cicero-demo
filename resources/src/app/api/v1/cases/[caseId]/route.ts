import { getCase } from '@/lib/server/cases/getCase'
import { updateCase } from '@/lib/server/cases/updateCase'
import { getUserFromSession } from '@/lib/server/users/getUserFromSession'
import { z } from 'zod'

const PatchRequestBody = z.object({
    answers: z.record(z.any())
})

export async function GET(
    request: Request,
    { params }: { params: Promise<{ caseId: string }> }
) {
    const user = await getUserFromSession()
    if (!user) return new Response('Unauthorized', { status: 401 })

    const { caseId } = await params
    const caseData = await getCase(user.workspaceId, caseId)

    if (!caseData) {
        return new Response('Not found', { status: 404 })
    }

    return Response.json(caseData)
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ caseId: string }> }
) {
    const user = await getUserFromSession()
    if (!user) return new Response('Unauthorized', { status: 401 })

    const { caseId } = await params
    const body = PatchRequestBody.parse(await request.json())

    const currentCase = await getCase(user.workspaceId, caseId)
    if (!currentCase) {
        return new Response('Not found', { status: 404 })
    }

    const updatedCase = await updateCase(user.workspaceId, caseId, {
        answers: body.answers
    })

    return Response.json(updatedCase)
}
