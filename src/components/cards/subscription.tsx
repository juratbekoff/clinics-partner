import {FaCheck} from "react-icons/fa";
import {BsFillPinAngleFill} from "react-icons/bs";
import {useGetPartnerInfoStore} from "../../hooks/useZustand.ts";

type SubscriptionProps = {
    name: string,
    includes: string[]
}

const SubscriptionCard = ({subscription}: { subscription: SubscriptionProps }) => {
    const partner = useGetPartnerInfoStore()

    return (
        <div
            className={`break-inside-avoid p-4 flex flex-col gap-3 text-sm border border-black/10 shadow rounded-lg bg-white`}
        >
            <div className={"flex justify-between"}>
                <h1 className={"font-semibold text-base"}>{subscription.name || "--"}</h1>

                {subscription.name === partner.subscription && (
                    <BsFillPinAngleFill className={"text-red-600 text-xl"}/>
                )}

            </div>

            <ul className={"flex flex-col gap-1"}>
                {subscription.includes.map((item, index) => (
                    <div className={"flex gap-2 items-center"}>
                        <FaCheck className={"text-primary"}/>
                        <li key={index}>{item}</li>
                    </div>
                ))}
            </ul>

        </div>
    );
};

export default SubscriptionCard;