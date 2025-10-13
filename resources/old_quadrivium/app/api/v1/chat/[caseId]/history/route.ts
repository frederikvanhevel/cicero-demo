import { getChatHistory } from '@/lib/server/chat/getChatHistory'
import { getUserFromSession } from '@/lib/server/users/getUserFromSession'
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ caseId: string }> }
) {
    const user = await getUserFromSession()
    if (!user) return new Response('Unauthorized', { status: 401 })

    const { caseId } = await params

    // Get chat history
    const messages = await getChatHistory(user.workspaceId, caseId)

    return NextResponse.json(messages)
}
