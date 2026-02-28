export type Tag = { label: string; value: string; bg: string };

const MOCK_TAGS: Tag[] = [
    { label: "Срочно", value: "urgent", bg: "red.500" },
    { label: "Важно", value: "important", bg: "orange.400" },
    { label: "Баг", value: "bug", bg: "pink.500" },
    { label: "Улучшение", value: "improvement", bg: "green.500" },
    { label: "Документация", value: "docs", bg: "blue.400" },
    { label: "Ревью", value: "review", bg: "purple.400" },
];

export const fetchTags = (query: string): Promise<Tag[]> =>
    new Promise((resolve) =>
        setTimeout(() => {
            const q = query.toLowerCase();
            resolve(MOCK_TAGS.filter((t) => t.label.toLowerCase().includes(q)));
        }, 300),
    );
