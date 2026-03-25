import {testUsers as user} from "@testdata/users/testUsers";

const nameOnCard = user.validUser.firstName + ' ' + user.validUser.lastName;

export const cardData = {
    name: nameOnCard,
    number: '4242424242424242',
    cvv: '123',
    expiryMonth: '12',
    expiryYear: '2024'
}