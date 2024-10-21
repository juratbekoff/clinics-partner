import {GiRoundStar} from "react-icons/gi";
import {ReviewType} from "../../types/review";
import {dateFormatter} from "../../lib/utils.tsx";
import {MdFileDownloadDone} from "react-icons/md";

const ReviewCard = ({review}: { review: ReviewType }) => {
    return (
        <div className={"flex flex-col gap-4 bg-white border border-grey_two shadow p-5 rounded-xl"}>
            <h1 className={"font-medium"}>{review?.user?.name}</h1>
            <span className={"text-sm"}>{review?.content}</span>
            <div className={"flex justify-between items-start"}>
                <div className={"flex  items-center gap-3"}>
                    <div className={"flex gap-1 items-center"}>
                        <span className={"font-semibold"}>{review.rating}</span>
                        
                        {Array.from({length: review.rating}).map((_, index) => (
                            <GiRoundStar key={index} className="text-yellow-400 text-[19px]"/>
                        ))}
                    </div>
                    <span className={"text-xs text-grey_four"}>{dateFormatter(review?.createdAt)}</span>
                </div>

                {
                    !review.reply
                        ? <div className={"flex gap-1 items-center text-primary text-sm cursor-pointer"}>
                            <img src="/chat-3.svg" alt="#"/>
                            <span className={"underline"}>Javob yozish</span>
                        </div> :
                        <div className={"flex gap-1 items-center  text-sm cursor-pointer text-green-600"}>
                            <MdFileDownloadDone className={"text-xl"}/>
                            <span className={"italic"}>Javob berilgan</span>
                        </div>
                }
            </div>
        </div>
    );
};

export default ReviewCard;