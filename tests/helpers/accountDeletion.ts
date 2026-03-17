import {verifyApiResponse} from "@asserts/ApiAsserts";
import {commonResponses as common} from "@constants/commonResponses";
import {customResponseMessages as custom} from "@constants/customResponseMessages";
import {ApiContainer} from "../../src/api/ApiContainer";

export async function accountDeletion(api: ApiContainer, email: string, password: string) {

    const response = await api
        .account()
        .deleteAccount(email, password)
        .withLogs();

    verifyApiResponse(response, 200, [
        {path: 'responseCode', expected: common.OK.code},
        {path: 'message', expected: custom.USER_DELETED.message}

    ])

}