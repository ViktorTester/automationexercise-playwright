export function logApiRequest(method: string, url: string, payload?: unknown): void {

    console.log('\n -> -> -> -> -> -> -> REQUEST');
    console.log(method, url);

    if (payload !== undefined) {
        console.log('Payload:', JSON.stringify(payload, null, 2));
    }
}

export function logApiResponse(body: unknown): void {

    console.log('\nRESPONSE BODY <- <- <- <- <- <- <-');
    console.log(JSON.stringify(body, null, 2));

}
