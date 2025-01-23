import type { Context } from "@netlify/functions"

export default async (req: Request, context: Context) => {
    return new Response(JSON.stringify("Hello, world!"), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}