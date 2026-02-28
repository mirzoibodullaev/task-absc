export interface FormValues {
    context: string;
    performers: string[];
    topics: string[];
    tags: string[];
    routineName: string;
    periodicity: string[];
    routineDescription: string;
    deadline: {
        date: Date | null;
        time: Date | null;
    };
    file: File | null;
}
