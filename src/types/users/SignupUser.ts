export type SignupUser = {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    mobileNr: string;
};

export type SignupStart = Pick<SignupUser, "firstName" | "email">;