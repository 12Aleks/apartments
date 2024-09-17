
import {Card} from "@nextui-org/card";
import {cn, Input, Textarea, Select, SelectItem, Image, Button} from "@nextui-org/react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid";
import BlockTitle from "@/app/components/blockTitle";
import {useFormContext} from "react-hook-form";
import {AddPropertyInputType} from "@/app/user/properties/add/_components/AddPropertyForm";
import { PropertyStatus, PropertyType } from "@prisma/client";




interface Props{
    title: string;
    types: PropertyType[];
    statuses: PropertyStatus[];
    className?: string;
    next: () => void;
}

const Basic = (props: Props) => {
    const {register, trigger,  getValues, formState: {errors}} = useFormContext<AddPropertyInputType>()
    const handleNext = async() => {
        //check fields in the form
        if(await trigger(["name", "description", "typeId", "statusId", "price"]) ) props.next();
    }


    return (
        <Card className={cn("gap-3 mt-5 p-3 grid grid-cols-1 md:grid-cols-3 border-0", props.className)}>
            <BlockTitle title={props.title} className="md:col-span-3"/>
            <Input
                {...register("name")}
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name}
                label="Name"
                name="name"
                defaultValue={getValues().name}
                className="md:col-span-3"/>
            <Textarea  {...register("description")}
                       errorMessage={errors.description?.message}
                       isInvalid={!!errors.description}
                       label="Description"
                       name="description"
                       defaultValue={getValues().description}
                       className="md:col-span-3"/>
            <div className="md:col-span-1 flex flex-col gap-3">
                <Select
                    {...register("typeId", {setValueAs: (v: any) => v.toString()})}
                    errorMessage={errors.typeId?.message}
                    isInvalid={!!errors.typeId}
                    label="Type"
                    selectionMode="single"
                    name="typeId"
                    defaultSelectedKeys={[getValues().typeId?.toString()|| ""]}>
                    {props.types.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                            {item.value}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="md:col-span-1 flex flex-col gap-3">
                <Select
                    {...register("statusId", {setValueAs: (v: any) => v.toString()})}
                    errorMessage={errors.statusId?.message}
                    isInvalid={!!errors.statusId}
                    label="Status"
                    selectionMode="single"
                    name="statusId"
                    defaultSelectedKeys={[getValues().statusId?.toString() || ""]}
                >
                    {props.statuses.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                            {item.value}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="md:col-span-1 flex flex-col gap-3">
                <Input
                    {...register("price", { setValueAs: (v: any) => v.toString() })}
                    errorMessage={errors.price?.message}
                    isInvalid={!!errors.price}
                    label="Price"
                    name="price"
                    defaultValue={getValues().price?.toString() || ""}
                />
            </div>
                <div className="flex justify-between col-span-3 gap-2 mt-5">
                    <Button
                        isDisabled
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

export default Basic;