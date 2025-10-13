import { Message } from '@/types/chat'
import db from '../db'

export async function getChatHistory(
    workspaceId: string,
    caseId: string
): Promise<Message[]> {
    const messages = await db.message.findMany({
        where: {
            caseId,
            case: {
                workspaceId
            }
        },
        orderBy: {
            createdAt: 'asc'
        },
        select: {
            role: true,
            content: true,
            createdAt: true
        }
    })

    return messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
        createdAt: msg.createdAt.toISOString()
    }))
}
