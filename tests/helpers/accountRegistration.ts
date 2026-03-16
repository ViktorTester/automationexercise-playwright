import {verifyApiResponse} from "@asserts/ApiAsserts";
import {commonResponses as common} from "@constants/commonResponses";
import {customResponseMessages as custom} from "@constants/customResponseMessages";
import {ApiContainer} from "../../src/api/ApiContainer";
import {SignupUser} from "@app-types/users/SignupUser";

export async function accountRegistration(api: ApiContainer, user: SignupUser) {

    const response = await api
        .account()
        .createAccount(user);

    verifyApiResponse(response, 200, [
        {path: 'responseCode', expected: common.CREATED.code},
        {path: 'message', expected: custom.USER_CREATED.message},
    ])

}