/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../setup/api";


interface FetchDataQueryKey {
    user_id: string;
}


const fetchData = async ({ queryKey }: QueryFunctionContext<[string, FetchDataQueryKey]>): Promise<Playlist[]> => {
    const [_, { user_id }] = queryKey;

    const response = await api.get(`/users/${user_id}/playlists`, { params: { limit: 50 } });

    return response.data.items;
};

export function useFetchPlaylists(user_id: string) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ["my-playlists", { user_id }],
        retry: 3,
        staleTime: 1000 * 60 * 60,
        placeholderData: [...Array(10)] as Playlist[]
    });

    return query
}