import {Button} from "../ui/button.tsx";
import {TiPin} from "react-icons/ti";

const SubscriptionCard = ({name, isCurrent}: { name: string, isCurrent: boolean }) => {
    return (
        <div
            className={`p-4 flex flex-col gap-3 text-sm border border-black/10 shadow rounded-lg`}
        >
            <div className={"flex justify-between items-center"}>
                <h1 className={"font-semibold text-base"}>{name || "--"}</h1>
                {isCurrent && <TiPin className={"text-red-500 text-2xl"}/>}
            </div>

            <div className={"flex flex-col gap-1"}>
                <div className={"flex gap-1"}>
                    <span className={"font-medium text-gray-600"}>Narxi:</span>
                    <span className={"font-medium text-grey_four"}>450 000 so'm/oy</span>
                </div>
                
                {
                    isCurrent ? <div className={"flex gap-1"}>
                        <span className={"font-medium text-gray-600"}>Keyingi to'lov:</span>
                        <span className={"font-medium text-grey_four"}>23.08.2024, 10:00 gacha</span>
                    </div> : <div className={"h-5"}></div>
                }
            </div>

            <div className={"flex gap-2 mt-2"}>
                <Button variant={"outline"}>Ba'tafsil</Button>

                {
                    isCurrent && <Button>To'lov qilish</Button>
                }
            </div>
        </div>
    );
};

export default SubscriptionCard;