import { useQuery } from "@tanstack/react-query";
import { fetchPeriodicity } from "../api/periodicityApi";
import { useDebounce } from "./useDebounce";

export const usePeriodicity = (search: string) => {
    const debouncedSearch = useDebounce(search);

    const { data: periodicity = [], isLoading, error } = useQuery({
        queryKey: ["periodicity", debouncedSearch],
        queryFn: () => fetchPeriodicity(debouncedSearch),
    });

    return { periodicity, isLoading, error };
};
