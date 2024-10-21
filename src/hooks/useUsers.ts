import {useQuery} from "react-query";
import {queryKeys} from "./queryKeys.ts";
import {api} from "../api";

export const useGetUsers = (enabled: boolean) => {
    return useQuery({
        queryKey: [queryKeys.GET_USERS],
        queryFn: async () => {
            return await api.get("/user/list")
        },
        enabled
    })
}
