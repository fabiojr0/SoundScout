/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../setup/api";
import { QueryKeys } from "../../utils/QueryKeys";


interface FetchDataQueryKey {
    time_range: TimeRange;
}

const fetchData = async ({ queryKey }: QueryFunctionContext<[string, FetchDataQueryKey]>): Promise<Artist[]> => {
    const [_, { time_range }] = queryKey;

    const response = await api.get(`/me/top/artists`, {
        params: {
            limit: 50,
            time_range
        },
    });

    const nextPageUrl = response.data.next;
    response.data.items = nextPageUrl
        ? [
            ...response.data.items,
            ...(await api.get(nextPageUrl)).data.items,
        ]
        : [...response.data.items];

    return response.data.items;
};

export function useFetchTopArtists(time_range: TimeRange) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: [QueryKeys.UserTopArtists, { time_range }],
        retry: 3,
        staleTime: 1000 * 60 * 60,
        placeholderData: [...Array(10)] as Artist[]
    });

    return query
}