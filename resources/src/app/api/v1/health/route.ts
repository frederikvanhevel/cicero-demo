import db from '@/lib/server/db'

export async function GET() {
    try {
        await db.$queryRaw`SELECT 1` // Basic query to check DB connection
        return Response.json({ ok: true })
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 })
    }
}
