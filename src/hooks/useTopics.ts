import { useQuery } from "@tanstack/react-query";
import { fetchTopics } from "../api/topicsApi";
import { useDebounce } from "./useDebounce";

export const useTopics = (search: string) => {
    const debouncedSearch = useDebounce(search);

    const { data: topics = [], isLoading, error } = useQuery({
        queryKey: ["topics", debouncedSearch],
        queryFn: () => fetchTopics(debouncedSearch),
    });

    return { topics, isLoading, error };
};
