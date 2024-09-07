"use client";
import { useState } from 'react';
import Stepper from "@/app/user/units/add/_components/Stepper";
import Basic from "@/app/user/units/add/_components/Basic";
import { UnitOrganization, UnitType } from "@prisma/client";
import Files from "./Files";
import Pictures from "@/app/user/units/add/_components/Pictures";
import Awards from "@/app/user/units/add/_components/Awards";
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { z } from "zod";
import { AddUnitFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const stepsList = [
    {label: 'Basic',},
    {label: 'Files',},
    {label: 'Pictures',},
    {label: 'Awards',},
];

interface Props {
    organization: UnitOrganization[]
    types: UnitType[]
    badgeUrl?: string
}

export type AddUnitInputType = z.infer<typeof AddUnitFormSchema>;

const AddUnitForm = (props: Props) => {
    // const methods = useForm<AddUnitInputType>({
    //     resolver: zodResolver(AddUnitFormSchema),
    // });

    const methods = useForm()

    const [badge, setBadge] = useState<File | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [step, setStep] = useState<number>(0);

    return (
        <div>
            <Stepper items={stepsList} activeItem={step} setActiveItem={setStep} />
            <FormProvider {...methods}>
                <form className="pl-3 pr-3" >
                    {step === 0 && (
                        <Basic
                            next={() => setStep((prev) => prev + 1)}
                            organizationTypes={props.organization}
                            types={props.types}
                            badge={badge}
                            setBadge={setBadge}
                            title={stepsList[0].label}
                        />
                    )}
                    {step === 1 && (
                        <Files
                            next={() => setStep((prev) => prev + 1)}
                            prev={() => setStep((prev) => prev - 1)}
                            files={files}
                            setFiles={setFiles}
                            title={stepsList[1].label}
                        />
                    )}
                    {step === 2 && (
                        <Pictures
                            next={() => setStep((prev) => prev + 1)}
                            prev={() => setStep((prev) => prev - 1)}
                            images={images}
                            setImages={setImages}
                            title={stepsList[2].label}
                        />
                    )}
                    {step === 3 && (
                        <Awards
                            prev={() => setStep((prev) => prev - 1)}
                            title={stepsList[3].label}
                        />
                    )}
                </form>
            </FormProvider>
        </div>
    );
};

export default AddUnitForm;
