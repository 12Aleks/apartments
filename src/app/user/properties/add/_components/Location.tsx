import {Card} from "@nextui-org/card";
import {Button, cn, Input, Textarea} from "@nextui-org/react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid";
import BlockTitle from "@/app/components/blockTitle";
import { AddPropertyInputType } from "./AddPropertyForm";
import {useFormContext} from "react-hook-form";


interface Props {
    title: string;
    next: () => void;
    prev: () => void;
    className?: string;
}

const Location = (props: Props) => {
    const {
        register,
        formState: { errors },
        trigger,
        getValues,
    } = useFormContext<AddPropertyInputType>();

    const handleNext = async () => {
        if (
            await trigger([
                "location.streetAddress",
                "location.city",
                "location.state",
                "location.zip",
                "location.region",
            ])
        )
            props.next();
    };

    const handlePrev = () => props.prev();


    return (
        <Card className={cn("gap-3 mt-5 p-3 grid grid-cols-1 md:grid-cols-1 border-0", props.className)}>
            <BlockTitle title={props.title} className="md:col-span-2"/>
            <Input
                {...register("location.streetAddress")}
                errorMessage={errors.location?.streetAddress?.message}
                isInvalid={!!errors.location?.streetAddress}
                label="Street Address"
                name="location.streetAddress"
                defaultValue={getValues().location.streetAddress}
            />

            <Input
                {...register("location.zip")}
                errorMessage={errors.location?.zip?.message}
                isInvalid={!!errors.location?.zip}
                label="Zip/Postal Code"
                defaultValue={getValues().location.zip}
            />

            <Input
                {...register("location.city")}
                errorMessage={errors.location?.city?.message}
                isInvalid={!!errors.location?.city}
                label="City"
                defaultValue={getValues().location.city}
            />

            <Input
                {...register("location.state")}
                errorMessage={errors.location?.state?.message}
                isInvalid={!!errors.location?.state}
                label="State"
                defaultValue={getValues().location.state}
            />

            <Input
                {...register("location.region")}
                errorMessage={errors.location?.region?.message}
                isInvalid={!!errors.location?.region}
                label="Region/Neighborhood"
                className="col-span-2"
                defaultValue={getValues().location.region}
            />

            <Textarea
                {...register("location.landmark")}
                errorMessage={errors.location?.landmark?.message}
                isInvalid={!!errors.location?.landmark}
                label="Landmarks"
                className="col-span-2"
                defaultValue={getValues().location.landmark}
            />
            <div className="flex justify-between col-span-2 gap-2 mt-5">
                <Button
                    onClick={handlePrev}
                    startContent={<ChevronLeftIcon className="w-6"/>}
                    color="primary" className="w-40">Previous</Button>
                <Button
                    onClick={handleNext}
                    endContent={<ChevronRightIcon className="w-6"/>}
                    color="primary" className="w-40">Next</Button>
            </div>
        </Card>
    );
};

export default Location;