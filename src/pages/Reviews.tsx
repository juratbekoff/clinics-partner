import Navbar from "../components/navbar.tsx";
import {Input} from "../components/ui/input.tsx";
import Select from "react-select";
import ReviewCard from "../components/cards/review.tsx";
import ReviewsStatsCard from "../components/cards/review-stats.tsx";
import {useGetReviews} from "../hooks/useReviews.ts";
import {GetReviewsType} from "../types/review";
import {useEffect, useState} from "react";

const Reviews = () => {
    const [keyword, setKeyword] = useState("")

    const getReviewsQuery = useGetReviews(keyword);
    const reviewsData: GetReviewsType = getReviewsQuery?.data?.data

    useEffect(() => {
        getReviewsQuery.refetch()
    }, [keyword]);

    return (
        <>
            <Navbar name={"Reviews"}/>

            <div className={"grid grid-cols-4 gap-5 text-sm"}>
                <Input
                    placeholder={"Search"}
                    className={"h-full"}
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <Select
                    placeholder={"Tanlang"}
                    options={[
                        {value: 0, label: "Barchasi"},
                        {value: 1, label: "1 yulduz"},
                        {value: 2, label: "2 yulduz"},
                        {value: 3, label: "3 yulduz"},
                        {value: 4, label: "4 yulduz"},
                        {value: 5, label: "5 yulduz"},
                    ]}
                />
            </div>

            <div className={"flex gap-10 mb-10"}>
                <div className={"grid grid-cols-1 gap-4 w-[70%]"}>
                    {
                        reviewsData?.reviews?.map((review) => (
                            <ReviewCard key={review.id} review={review}/>
                        ))
                    }
                </div>

                <div className={"w-[30%]"}>
                    <div>
                        <ReviewsStatsCard average={reviewsData?.stats?.average} stats={reviewsData?.stats?.byStars}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reviews;