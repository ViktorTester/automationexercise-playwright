export class RandomData {
    private static randomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private static uniqueSuffix(): string {
        return `${Date.now()}${this.randomNumber(100, 999)}`;
    }

    static email(prefix = "user"): string {
        return `${prefix}_${this.uniqueSuffix()}@test.local`;
    }

    static password(): string {
        return `Test${this.randomNumber(1000, 9999)}!`;
    }

    static firstName(): string {
        return `John${this.randomNumber(100, 999)}`;
    }

    static lastName(): string {
        return `Smith${this.randomNumber(100, 999)}`;
    }

    static company(): string {
        return `Company${this.randomNumber(100, 999)}`;
    }

    static addressLine1(): string {
        return `${this.randomNumber(1, 999)} Main Street`;
    }

    static addressLine2(): string {
        return `Apt ${this.randomNumber(1, 999)}`;
    }

    static state(): string {
        return `State${this.randomNumber(1, 99)}`;
    }

    static city(): string {
        return `City${this.randomNumber(1, 99)}`;
    }

    static zipCode(): string {
        return `${this.randomNumber(10000, 99999)}`;
    }

    static mobileNumber(): string {
        return `${this.randomNumber(100000000, 999999999)}`;
    }
}