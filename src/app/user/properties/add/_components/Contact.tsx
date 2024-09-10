import { ChevronLeftIcon, ChevronRightIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import { Button, Card, Input, cn } from "@nextui-org/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { AddPropertyInputType } from "./AddPropertyForm";
import BlockTitle from "@/app/components/blockTitle";

interface Props {
    title: string
    prev: () => void;
    className?: string;
}
const Contact = ({ title, prev, className }: Props) => {
    const {
        register,
        formState: { errors },
        control,
        getValues,
    } = useFormContext<AddPropertyInputType>();
    return (
        <Card className={cn("grid grid-cols-1 md:grid-cols-3 gap-3 p-2", className)}>
            <BlockTitle title={title} className="md:col-span-3"/>
            <Input
                {...register("contact.name")}
                errorMessage={errors.contact?.name?.message}
                isInvalid={!!errors.contact?.name}
                label="Contact Name"
                defaultValue={getValues("contact.name")}
            />

            <Input
                {...register("contact.phone")}
                errorMessage={errors.contact?.phone?.message}
                isInvalid={!!errors.contact?.phone}
                label="Phone"
                defaultValue={getValues("contact.phone")}
            />

            <Input
                {...register("contact.email")}
                errorMessage={errors.contact?.email?.message}
                isInvalid={!!errors.contact?.email}
                label="Email"
                defaultValue={getValues("contact.email")}
            />
            <div className="flex justify-between col-span-2 gap-2 mt-5">
                <Button
                    onClick={prev}
                    startContent={<ChevronLeftIcon className="w-6"/>}
                    color="primary" className="w-40">Previous</Button>
                <Button
                    type="submit"
                    endContent={<PlusCircleIcon className="w-6"/>}
                    className="w-40 text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2">Create</Button>
            </div>
        </Card>
    );
};

export default Contact;