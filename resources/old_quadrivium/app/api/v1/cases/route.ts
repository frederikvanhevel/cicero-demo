import { createCase } from '@/lib/server/cases/createCase'
import { listCases } from '@/lib/server/cases/listCases'
import { getUserFromSession } from '@/lib/server/users/getUserFromSession'
import { z } from 'zod'

export async function GET() {
    const user = await getUserFromSession()
    if (!user) return new Response('Unauthorized', { status: 401 })

    const cases = await listCases(user.workspaceId)

    return Response.json(cases)
}

const RequestBody = z.object({
    answers: z.any()
})
type RequestBody = z.infer<typeof RequestBody>

export async function POST(request: Request) {
    const user = await getUserFromSession()
    if (!user) return new Response('Unauthorized', { status: 401 })

    const body = RequestBody.parse(await request.json())

    const createdCase = await createCase(
        user.workspaceId,
        user.id,
        body.answers
    )

    return Response.json(createdCase)
}
