export type Category = {
    id: string;
    group: string;
    name: string;
};

export const categories = {
    // Women
    WOMEN_DRESS: {
        id: "1",
        group: " Women",
        name: "Dress",
    },
    WOMEN_TOPS: {
        id: "2",
        group: " Women",
        name: "Tops",
    },

    WOMEN_SAREE: {
        id: "7",
        group: " Women",
        name: "Saree",
    },
    // Men
    MEN_TSHIRTS: {
        id: "3",
        group: " Men",
        name: "Tshirts",
    },

    MEN_JEANS: {
        id: "6",
        group: " Men",
        name: "Jeans",
    },

    // Kids
    KIDS_DRESS: {
        id: "4",
        group: " Kids",
        name: "Dress",
    },

    KIDS_TOPS_TSHIRTS: {
        id: "5",
        group: " Kids",
        name: "Tops & Shirts",
    }
} as const;