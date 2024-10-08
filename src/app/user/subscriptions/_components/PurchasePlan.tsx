"use client"
import {SubscriptionPlan} from "@prisma/client";
import {Button} from "@nextui-org/react";
import {ShoppingBagIcon} from "@heroicons/react/16/solid";
import {useState} from "react";
import CheckoutForm from "@/app/user/subscriptions/_components/CheckoutForm";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {createPaymentIntent} from "@/lib/actions/payment";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

type Props = {
    plan: SubscriptionPlan,
    className?: string
}

const PurchasePlan = ({plan, className}: Props) => {

    const {user} = useKindeBrowserClient();
    const [showCheckout, setShowCheckout] = useState<boolean>(false);
    const [clientSecret, setClientSecret] = useState<string | null>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    if (plan.price === 0) return <Button className={className}>Try it for free!</Button>


    const initialPayment = async () => {
        setIsLoading(true);
        const paymentIntent = await createPaymentIntent(plan.price * 100, `Payment of the user ${user?.given_name} ${user?.family_name}
        for buying ${plan.name}.`)
        setClientSecret(paymentIntent.client_secret)
        setShowCheckout(true);
        setIsLoading(false);
    }

    return (

        <>
            <Button onClick={initialPayment} color="primary" endContent={<ShoppingBagIcon className="w-4"/>}
                    className={className}
                    isLoading={isLoading}
            >
                Purchase Subscription
            </Button>
            {clientSecret!! && (
                <Elements stripe={stripePromise} options={{
                    clientSecret: clientSecret
                }}>
                    <CheckoutForm setShow={setShowCheckout} show={showCheckout}/>
                </Elements>
            )}
        </>

    );
};

export default PurchasePlan;