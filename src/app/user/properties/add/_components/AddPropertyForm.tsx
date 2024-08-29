"use client"
import {useState} from 'react';
import Stepper from "@/app/user/properties/add/_components/Stepper";
import Basic from "@/app/user/properties/add/_components/Basic";
import {UnitOrganization, UnitType} from "@prisma/client";
import { cn } from "@nextui-org/react";
import Files from "@/app/user/properties/add/_components/Files";
import Pictures from "@/app/user/properties/add/_components/Pictures";

const stepsList = [
    {
        label: 'Basic',
    },
    {
        label: 'Files',
    },
    {
        label: 'Pictures',
    },
    {
        label: 'Awards',
    },
]

interface Props{
    organization: UnitOrganization[]
    types: UnitType[]
    badgeUrl?: string
}

const AddPropertyForm = (props: Props) => {
    const [step, setStep] = useState<number>(0)


    return (
        <div>
            <Stepper items={stepsList} activeItem={step} setActiveItem={setStep}/>
            <form className="pl-3 pr-3">
                <Basic
                    className={cn({ hidden: step !== 0 })}
                    next={() => setStep((prev) => prev + 1)}
                    organizationTypes={props.organization}
                    types={props.types}/>
                <Files className={cn({ hidden: step !== 1 })}
                       next={() => setStep((prev) => prev + 1)}
                       prev={() => setStep((prev) => prev - 1)}/>
                <Pictures className={cn({ hidden: step !== 2 })}
                          next={() => setStep((prev) => prev + 1)}
                          prev={() => setStep((prev) => prev - 1)}/>
            </form>
        </div>
    );
};

export default AddPropertyForm;