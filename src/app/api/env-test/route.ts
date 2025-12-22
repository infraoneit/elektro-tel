export async function GET() {
    return new Response(
        JSON.stringify({
            hasId: !!process.env.KEYSTATIC_GITHUB_CLIENT_ID,
            hasSecret: !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
            hasKsSecret: !!process.env.KEYSTATIC_SECRET,
        }),
        { headers: { 'content-type': 'application/json' } }
    );
}
