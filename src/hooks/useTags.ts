import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "../api/tagsApi";
import { useDebounce } from "./useDebounce";

export const useTags = (search: string) => {
    const debouncedSearch = useDebounce(search);

    const { data: tags = [], isLoading, error } = useQuery({
        queryKey: ["tags", debouncedSearch],
        queryFn: () => fetchTags(debouncedSearch),
    });

    return { tags, isLoading, error };
};
