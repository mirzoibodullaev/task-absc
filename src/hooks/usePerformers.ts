import { useQuery } from "@tanstack/react-query";
import { fetchPerformers } from "../api/performersApi";
import { useDebounce } from "./useDebounce";
import type { SelectItem } from "../components/MultiSelect";

export const usePerformers = (search: string) => {
    const debouncedSearch = useDebounce(search);

    const { data, isLoading, error } = useQuery({
        queryKey: ["performers", debouncedSearch],
        queryFn: () => fetchPerformers(debouncedSearch),
    });

    const performers: SelectItem[] = (data ?? []).map((p) => ({
        label: `${p.firstName} ${p.lastName}`,
        value: `${p.firstName.toLowerCase()}_${p.lastName.toLowerCase()}`,
        avatar: p.avatar,
    }));

    return { performers, isLoading, error };
};
