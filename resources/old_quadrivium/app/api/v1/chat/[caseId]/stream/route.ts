import { NextRequest } from 'next/server'

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ caseId: string }> }
) {
    try {
        const { caseId } = await params
        const body = await request.json()

        const response = await fetch(
            `${process.env.WORKER_API_URL}/chat/${caseId}/stream`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        )

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        // Create a transform stream that passes through the data unchanged
        const transformStream = new TransformStream({
            transform(chunk, controller) {
                controller.enqueue(chunk)
            }
        })

        // Pipe the response body through our transform stream
        const readable = response.body
        if (!readable) {
            throw new Error('No response body available')
        }

        const transformed = readable.pipeThrough(transformStream)

        return new Response(transformed, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                Connection: 'keep-alive'
            }
        })
    } catch (error) {
        console.error('Error in chat stream:', error)
        // Return error as SSE format
        return new Response(
            `data: ${JSON.stringify({ error: 'Failed to process chat message' })}\n\n`,
            {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    Connection: 'keep-alive'
                },
                status: 500
            }
        )
    }
}
