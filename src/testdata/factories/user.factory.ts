import {RandomData} from "../utils/random-data";
import {SignupUser} from "@app-types/users/SignupUser";

export class UserFactory {
    static random(overrides: Partial<SignupUser> = {}): SignupUser {
        return {
            title: "Mr",
            email: RandomData.email(),
            password: RandomData.password(),
            firstName: RandomData.firstName(),
            lastName: RandomData.lastName(),
            company: RandomData.company(),
            address1: RandomData.addressLine1(),
            address2: RandomData.addressLine2(),
            country: "Canada",
            state: RandomData.state(),
            city: RandomData.city(),
            zipCode: RandomData.zipCode(),
            mobileNr: RandomData.mobileNumber(),
            ...overrides,
        };
    }
}