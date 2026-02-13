import type {ApiCallResponse} from "../api/RequestClient";

export class ApiLogger {
    static log(r: ApiCallResponse): void {
        console.log('\n -> -> -> -> -> -> -> REQUEST');
        console.log("[" + r.method + "]", r.url);

        if (r.payload !== undefined) {
            console.log('Payload:\n', JSON.stringify(r.payload, null, 2));
        }

        console.log('\nRESPONSE <- <- <- <- <- <- <-');
        console.log('Status:', r.status);
        console.log('Body:', JSON.stringify(r.body, null, 2));
    }
}
