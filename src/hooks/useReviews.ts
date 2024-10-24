import {useMutation, useQuery} from "react-query";
import {queryKeys} from "./queryKeys.ts";
import {api} from "../api";
import {queryClient} from "../main.tsx";
import {customToast} from "../lib/utils.tsx";

export const useGetReviews = (keyword: string = "", rating: number) => {
    const clinicId = +localStorage.getItem("currentClinic")!
    return useQuery({
        queryKey: [queryKeys.GET_REVIEWS],
        queryFn: async () => {
            return await api.get(`/review`, {
                params: {
                    clinicId,
                    keyword,
                    rating
                }
            })
        }
    })
}

export const useReplyReview = () => {
    return useMutation({
        mutationKey: [queryKeys.REPLY_TO_REVIEW],
        mutationFn: async (data: any) => {
            return await api.post("/review/reply", data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_REVIEWS],
            })
            customToast("SUCCESS", "Successfully replied!")
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Something went wrong, please try again later!"
            );
        },
    });
};
