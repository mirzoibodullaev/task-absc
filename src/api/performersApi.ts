export type Performer = {
    firstName: string;
    lastName: string;
    avatar: string;
};

const MOCK_PERFORMERS: Performer[] = [
    {
        firstName: "John",
        lastName: "Doe",
        avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
        firstName: "Alice",
        lastName: "Johnson",
        avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
        firstName: "Bob",
        lastName: "Brown",
        avatar: "https://i.pravatar.cc/150?img=4",
    },
];

export const fetchPerformers = (query: string): Promise<Performer[]> =>
    new Promise((resolve) =>
        setTimeout(() => {
            const q = query.toLowerCase();
            resolve(
                MOCK_PERFORMERS.filter(
                    (p) =>
                        p.firstName.toLowerCase().includes(q) ||
                        p.lastName.toLowerCase().includes(q),
                ),
            );
        }, 300),
    );
