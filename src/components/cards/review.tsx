import {GiRoundStar} from "react-icons/gi";
import {ReviewType} from "../../types/review";
import {dateFormatter} from "../../lib/utils.tsx";
import {MdFileDownloadDone} from "react-icons/md";
import {Input} from "../ui/input.tsx";
import {AiOutlineSend} from "react-icons/ai";
import {useEffect, useState} from "react";
import {useReplyReview} from "../../hooks/useReviews.ts";
import {LuLoader2} from "react-icons/lu";

const ReviewCard = ({review}: { review: ReviewType }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState(review?.reply);

    const replyMutation = useReplyReview()

    const onReply = (e: any) => {
        e.preventDefault();
        
        replyMutation.mutate({
            commentId: review.id,
            reply: replyContent
        })
    }

    useEffect(() => {
        setIsReplying(false);
    }, [replyMutation.isSuccess]);


    return (
        <div
            className={"break-inside-avoid  flex flex-col gap-4 bg-white border border-grey_two shadow p-5 rounded-xl"}>
            <h1 className={"font-medium"}>{review?.user?.name}</h1>
            <span className={"text-sm"}>{review?.content}</span>
            <div className={"flex justify-between items-start"}>
                <div className={"flex  items-center gap-3"}>
                    <div className={"flex gap-1 items-center"}>
                        <span className={"font-semibold"}>{review.rating}</span>
                        <GiRoundStar className="text-yellow-400 text-[19px]"/>
                    </div>
                    <span className={"text-xs text-grey_four"}>{dateFormatter(review?.createdAt)}</span>
                </div>

                {
                    !review.reply
                        ? <div
                            onClick={() => setIsReplying(!isReplying)}
                            className={"flex gap-1 items-center text-primary text-sm cursor-pointer"}
                        >
                            <img src="/chat-3.svg" alt="#"/>
                            <span className={"underline"}>Javob yozish</span>
                        </div> :
                        <div
                            onClick={() => setIsReplying(!isReplying)}
                            className={"flex gap-1 items-center  text-sm cursor-pointer text-grey_four"}
                        >
                            <MdFileDownloadDone className={"text-xl"}/>
                            <span className={"italic"}>Javob berilgan</span>
                        </div>
                }
            </div>

            {
                isReplying && (
                    <form
                        onSubmit={onReply}
                        className={"flex gap-2 items-center py-[2px] pr-2 border-2 rounded border-primary"}
                    >
                        <Input
                            defaultValue={review?.reply}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder={"Javob yozish..."}
                            className={"border-none outline-none shadow-none"}
                        />

                        {
                            replyMutation.isLoading ?
                                <LuLoader2 className={"animate-spin text-xl text-gray-600 cursor-pointer"}/>
                                : <AiOutlineSend onClick={onReply} className={"text-xl text-gray-600 cursor-pointer"}/>
                        }

                    </form>
                )
            }
        </div>
    );
};

export default ReviewCard;