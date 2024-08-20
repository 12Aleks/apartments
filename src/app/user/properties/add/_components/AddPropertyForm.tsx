"use client"
import {useState} from 'react';
import Stepper from "@/app/user/properties/add/_components/Stepper";

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

const AddPropertyForm = () => {
    const [step, setStep] = useState<number>(0)


    return (
        <div>
            <Stepper items={stepsList} activeItem={step} setActiveItem={setStep}/>
        </div>
    );
};

export default AddPropertyForm;