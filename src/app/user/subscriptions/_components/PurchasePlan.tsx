import {SubscriptionPlan} from "@prisma/client";
import {Button} from "@nextui-org/react";
import {ShoppingBagIcon} from "@heroicons/react/16/solid";

type Props = {
    plan: SubscriptionPlan,
    className?: string
}

const PurchasePlan = ({plan, className}: Props) => {

    if(plan.price === 0) return <Button className={className}>Try it for free!</Button>

    return (
        <Button color="primary" endContent={<ShoppingBagIcon className="w-4" />} className={className}>
            Purchase Subscription
        </Button>
    );
};

export default PurchasePlan;