import {GiRoundStar} from "react-icons/gi";
import {ReviewRatingType} from "../../types/review";

const ReviewStatsCard = ({average, stats}: { average: number, stats: ReviewRatingType[] }) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
                <div className="flex gap-1 text-[18px]">
                    <span> Average:</span>
                    <span className="font-semibold">{average || 0}</span>
                </div>

                <GiRoundStar className="text-yellow-400 text-2xl"/>
            </div>

            <div className="flex flex-col">
                {stats?.map((stat, index) => (
                    <div key={index} className="flex justify-between gap-2 items-center">
                        <div className="flex gap-1 items-center">
                            <span
                                className={`text-base font-semibold ${stat.stars == 1 && "ml-[1px]"}`}>{stat.stars}</span>
                            <GiRoundStar className="text-yellow-400 text-[19px]"/>
                        </div>

                        <div className="rounded-full bg-white border w-[70%] h-[10px]">
                            <div
                                className="bg-primary rounded-full h-[10px]"
                                style={{width: `${stat.percent}%`}}
                            ></div>
                        </div>

                        <span className="font-medium text-gray-600">{stat.count} ta</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewStatsCard;