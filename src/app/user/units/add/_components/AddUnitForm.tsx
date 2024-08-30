"use client"
import {useState} from 'react';
import Stepper from "@/app/user/units/add/_components/Stepper";
import Basic from "@/app/user/units/add/_components/Basic";
import {UnitOrganization, UnitType} from "@prisma/client";
import { cn } from "@nextui-org/react";
import Files from "@/app/user/units/add/_components/Files";
import Pictures from "@/app/user/units/add/_components/Pictures";

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

const AddUnitForm = (props: Props) => {
    const [images, setImages] = useState<File[]>([]);
    const [files, setFiles] = useState<File[]>([]);
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
                       prev={() => setStep((prev) => prev - 1)}
                       files={files}
                       setFiles={setFiles}
                />
                <Pictures className={cn({ hidden: step !== 2 })}
                          next={() => setStep((prev) => prev + 1)}
                          prev={() => setStep((prev) => prev - 1)}
                          images={images}
                          setImages={setImages}
                />
            </form>
        </div>
    );
};

export default AddUnitForm;