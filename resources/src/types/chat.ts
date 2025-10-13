export type MessageRole = 'USER' | 'ASSISTANT' | 'SYSTEM'

export interface Message {
    role: MessageRole
    content: string
    createdAt: string
    metadata?: Record<string, any>
}
