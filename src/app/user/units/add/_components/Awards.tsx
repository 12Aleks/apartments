import React from 'react';
import {Button, cn} from "@nextui-org/react";
import {Card} from "@nextui-org/card";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid";
import BlockTitle from "@/app/components/blockTitle";

interface Props {
    title: string;
    prev: () => void;
    className?: string;
}

const Awards = (props: Props) => {

    const handlePrev = () => props.prev();


    return (
        <Card className={cn("gap-3 mt-5 p-3 grid grid-cols-1 md:grid-cols-1 border-0", props.className)}>
            <BlockTitle title={props.title} className="md:col-span-2"/>
            <div className="flex justify-between col-span-2 gap-2 mt-5">
                <Button
                    onClick={handlePrev}
                    startContent={<ChevronLeftIcon className="w-6"/>}
                    color="primary" className="w-40">Previous</Button>
                <Button

                    endContent={<ChevronRightIcon className="w-6"/>}
                    color="primary" className="w-40">Create</Button>
            </div>
        </Card>
    );
};

export default Awards;