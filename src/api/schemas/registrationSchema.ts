export const registrationSchema = {
    type: 'object',
    required: ['responseCode', 'message'],
    additionalProperties: false,
    properties: {
        responseCode: { type: 'number' },
        message: { type: 'string' }
    }
} as const;