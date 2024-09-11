"use client";
import { useState } from 'react';
import { Prisma, Property, PropertyImage, PropertyStatus, PropertyType } from "@prisma/client";
import Stepper from "@/app/user/properties/add/_components/Stepper";
import Basic from "@/app/user/properties/add/_components/Basic";
import Location from "./Location";
import Pictures from "@/app/user/properties/add/_components/Pictures";
import {useForm, FormProvider,  SubmitHandler} from "react-hook-form"
import { z } from "zod";
import { AddPropertyFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Features from "@/app/user/properties/add/_components/Features";
import Contact from "@/app/user/properties/add/_components/Contact";
import {uploadImages} from "@/lib/upload";

const stepsList = [
    {
        label: "Basic",
    },
    {
        label: "Location",
    },
    {
        label: "Features",
    },
    {
        label: "Pictures",
    },
    {
        label: "Contact",
    },
];

interface Props {
    types: PropertyType[];
    statuses: PropertyStatus[];

}

export type AddPropertyInputType = z.infer<typeof AddPropertyFormSchema>;

const AddPropertyForm = (props: Props) => {
    const methods = useForm<AddPropertyInputType>({
        resolver: zodResolver(AddPropertyFormSchema),
    });

    const [images, setImages] = useState<File[]>([]);
    const [step, setStep] = useState<number>(0);

    const onSubmit: SubmitHandler<AddPropertyInputType> = async (data) => {
        console.log({data});
        const imagesUrl: string[] = await uploadImages(images);
        console.log(imagesUrl);
    }
    
    return (
        <div>
            <Stepper items={stepsList} activeItem={step} setActiveItem={setStep} />
            <FormProvider {...methods}>
                <form className="pl-3 pr-3" onSubmit={methods.handleSubmit(onSubmit, errors => console.log(errors))}>
                    {step === 0 && (
                        <Basic
                            next={() => setStep((prev) => prev + 1)}
                            types={props.types}
                            statuses={props.statuses}
                            title={stepsList[0].label}
                        />
                    )}
                    {step === 1 && (
                        <Location title={stepsList[1].label}
                                  next={() => setStep((prev) => prev + 1)}
                                  prev={() => setStep((prev) => prev - 1)}
                        />
                    )}
                    {step === 2 && (
                        <Features title={stepsList[2].label}
                                  next={() => setStep((prev) => prev + 1)}
                                  prev={() => setStep((prev) => prev - 1)}
                        />
                    )}
                    {step === 3 && (
                        <Pictures
                            next={() => setStep((prev) => prev + 1)}
                            prev={() => setStep((prev) => prev - 1)}
                            images={images}
                            setImages={setImages}
                            title={stepsList[3].label}
                        />
                    )}
                    {step === 4 && (
                        <Contact
                            prev={() => setStep((prev) => prev - 1)}
                            title={stepsList[4].label}
                        />
                    )}
                </form>
            </FormProvider>
        </div>
    );
};

export default AddPropertyForm;
