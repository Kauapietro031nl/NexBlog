import { useMemo } from "react";
import { useLocation } from "react-router-dom";
useMemo


export function useQuery() {
    const { search } = useLocation()
    return useMemo(() => new URLSearchParams(search),[search]);


}