export type Brand = {
    label: string;
    path: string;
};

export const brands = {
    POLO: {
        label: "(6) POLO",
        path: "Polo",
    },

    MADAME: {
        label: "(5) MADAME",
        path: "Madame",
    }
} as const;