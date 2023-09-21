import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "@tanstack/react-query"

export type Query = {
    query: {
        data: any,
        isLoading: boolean,
        refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
    }
}
