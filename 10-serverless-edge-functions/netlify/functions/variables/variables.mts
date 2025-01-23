import type { Context } from "@netlify/functions"

export default async (req: Request, context: Context) => {
    const importantVariable = process.env.MY_IMPORTANT_VARIABLE;
    if (!importantVariable) {
        throw 'Missing MY_IMPORTANT_VARIABLE';
    }

    return new Response(JSON.stringify(importantVariable), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}