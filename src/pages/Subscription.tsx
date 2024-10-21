import {useLocation} from "react-router-dom";
import SubscriptionCard from "../components/cards/subscription.tsx";

const Subscription = () => {
    const {pathname} = useLocation()

    return (
        <>
            <div className={"grid grid-cols-3 gap-5"}>
                <SubscriptionCard name={"Oddiy"} isCurrent/>
                <SubscriptionCard name={"Pro"} isCurrent={false}/>
                <SubscriptionCard name={"Premium"} isCurrent={false}/>
            </div>
        </>
    );
};

export default Subscription;