"use client";
import {UnitOrganization, UnitType} from "@prisma/client";

import {Card} from "@nextui-org/card";
import {cn, Input, Textarea, Select, SelectItem, Image, Button} from "@nextui-org/react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid";
import UploadFile from "@/app/user/units/add/_components/UploadFile";
import BlockTitle from "@/app/components/blockTitle";




interface Props{
    title: string;
    className?: string;
    organizationTypes: UnitOrganization[];
    types: UnitType[];
    next: () => void;
    badge: File;
    setBadge: (badge: File) => void;
}

const Basic = (props: Props) => {
    const handleNext = () => props.next();

    return (
        <Card className={cn("gap-3 mt-5 p-3 grid grid-cols-1 md:grid-cols-2 border-0", props.className)}>
            <BlockTitle title={props.title} className="md:col-span-2"/>
            <div className="col-span-2 flex justify-center relative">
               <div className="relative ">

                   <Image
                       isBlurred
                       width={250}
                       height={250}
                       src={ props.badge ? URL.createObjectURL(props.badge) : "/no_image.jpg" }
                       alt="badge"
                       className="border mb-4 relative z-0
                       object-contain object-center "
                   />
                   <UploadFile setBadgeImage={(data) => props.setBadge(data)}/>
               </div>
            </div>
            <Input label="title" className="md:col-span-2" />
            <Textarea label="description" className="md:col-span-2" />
            <div className="md:col-span-1 flex flex-col gap-3">
                <Select label="Organization" className="w-full" selectionMode="single">
                    {props.organizationTypes.map((organization) => (
                        <SelectItem key={organization.id} value={organization.id}>
                            {organization.value}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="md:col-span-1 flex flex-col gap-3">
                <Select label="Unit type" className="w-full" selectionMode="single">
                    {props.types.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                            {type.value}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="flex justify-between col-span-2 gap-2 mt-5">
                <Button
                    isDisabled
                    startContent={<ChevronLeftIcon className="w-6" />}
                    color="primary" className="w-40">Previous</Button>
                <Button
                    onClick={handleNext}
                    endContent={<ChevronRightIcon className="w-6" />}
                    color="primary" className="w-40">Next</Button>
            </div>
        </Card>
    );
};

export default Basic;