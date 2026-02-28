export type Periodicity = { label: string; value: string };

const MOCK_PERIODICITY: Periodicity[] = [
    { label: "Ежедневно", value: "daily" },
    { label: "Еженедельно", value: "weekly" },
    { label: "Ежемесячно", value: "monthly" },
    { label: "Ежегодно", value: "yearly" },
];

export const fetchPeriodicity = (query: string): Promise<Periodicity[]> =>
    new Promise((resolve) =>
        setTimeout(() => {
            const q = query.toLowerCase();
            resolve(
                MOCK_PERIODICITY.filter((p) =>
                    p.label.toLowerCase().includes(q),
                ),
            );
        }, 300),
    );
