import React from 'react';
import prisma from "@/lib/prisma";
import {SubscriptionPlan} from "@prisma/client";
import PageTitle from "@/app/components/pageTitle";
import PurchasePlan from "@/app/user/subscriptions/_components/PurchasePlan";

const SubscriptionPage = async () => {
    const subscriptionPage =  prisma.subscriptionPlan.findMany({
        orderBy:{
           price:  "asc"
        }
    });

    const [subscriptionPlans] = await Promise.all([subscriptionPage])

    return (
        <div className="h-100">
            <PageTitle title={"Subscription Plans"}  />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5 ps-3 pe-3 pb-3">
            {subscriptionPlans.map(plan =>
                <Plan plan={plan} key={plan.id} />
            )}
        </div>
        </div>
    );
};

export default SubscriptionPage;


const Plan = ({plan}: {plan: SubscriptionPlan}) => {
 return (
     <div className="border rounded shadow-sm flex flex-col gap-5  p-5 hover:shadow">
       <h1 className="text-xl font-bold text-primary-500 text-center">{plan.name}</h1>
       <h2 className="text-2xl lg:text-4xl font-bold text-orange-600 text-center">${plan.price.toString()}</h2>
       <hr/>
       <div className="flex flex-col gap-1 text-center space-x-1">
           {plan.features.split(",").map(feature => <>
               <p className="text-slate-700 text-sm">{feature.trim()}</p>
            </>
           )}
       </div>
         <PurchasePlan plan={plan} className="mt-auto" />
     </div>
 )
}