export type Topic = { label: string; value: string };

const MOCK_TOPICS: Topic[] = [
    { label: "Дизайн", value: "design" },
    { label: "Разработка", value: "development" },
    { label: "Тестирование", value: "testing" },
    { label: "Маркетинг", value: "marketing" },
    { label: "Аналитика", value: "analytics" },
    { label: "Управление проектом", value: "management" },
];

export const fetchTopics = (query: string): Promise<Topic[]> =>
    new Promise((resolve) =>
        setTimeout(() => {
            const q = query.toLowerCase();
            resolve(
                MOCK_TOPICS.filter((t) => t.label.toLowerCase().includes(q)),
            );
        }, 300),
    );
