import SubscriptionCard from "../components/cards/subscription.tsx";
import {subscriptionPlans} from "../constants";

const Subscription = () => {
    return (
        <>
            <div className={"columns-3 gap-5"}>
                {
                    subscriptionPlans.map((subscription, index) => (
                        <SubscriptionCard key={index} subscription={subscription}/>
                    ))
                }
            </div>
        </>
    );
};

export default Subscription;