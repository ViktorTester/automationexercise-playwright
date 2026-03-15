export function randomEmail() {
    return `user_${Date.now()}@test.com`;
}

export function randomNumberInRange(from: number, to: number): string {
    const random = Math.floor(Math.random() * (to - from + 1)) + to;
    return random.toString();
}