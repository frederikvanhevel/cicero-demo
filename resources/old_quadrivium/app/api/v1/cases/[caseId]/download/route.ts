import { getCase } from '@/lib/server/cases/getCase'
import { getUserFromSession } from '@/lib/server/users/getUserFromSession'
import { RapidFolio } from '@rapidfolio/node-sdk'
import { NextResponse } from 'next/server'

const rapidfolio = new RapidFolio({
    apiKey: process.env.RAPIDFOLIO_API_KEY!
})

interface PatchParams {
    caseId: string
}

export async function GET(
    request: Request,
    props: { params: Promise<PatchParams> }
) {
    const user = await getUserFromSession()
    if (!user) return new Response('Unauthorized', { status: 401 })

    const params = await props.params
    const caseDetails = await getCase(user.workspaceId, params.caseId)

    if (!caseDetails) return new Response('Case not found', { status: 404 })

    const stream = await rapidfolio.createDocument(
        process.env.RAPIDFOLIO_DOCUMENT_ID!,
        {
            variables: {
                content: caseDetails.result
            }
        }
    )

    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'application/pdf'
        }
    })
}
