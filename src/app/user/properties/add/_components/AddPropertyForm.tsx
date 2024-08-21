"use client"
import {useState} from 'react';
import Stepper from "@/app/user/properties/add/_components/Stepper";
import Basic from "@/app/user/properties/add/_components/Basic";
import {UnitOrganization, UnitType} from "@prisma/client";

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
}

const AddPropertyForm = (props: Props) => {
    const [step, setStep] = useState<number>(0)


    return (
        <div>
            <Stepper items={stepsList} activeItem={step} setActiveItem={setStep}/>
            <form className="pl-3 pr-3">
                <Basic organizationTypes={props.organization} types={props.types}/>
            </form>
        </div>
    );
};

export default AddPropertyForm;