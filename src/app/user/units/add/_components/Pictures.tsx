import React from 'react';
import {Card} from "@nextui-org/card";
import {Button, cn} from "@nextui-org/react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid";
import FileInput from "@/app/components/fileUpload";
import BlockTitle from "@/app/components/blockTitle";
import PictureCard from "@/app/user/units/add/_components/PictureCard";

interface Props {
    title: string;
    next: () => void;
    prev: () => void;
    className?: string;
    images: File[];
    setImages: (image: File[]) => void;
}

const Pictures = (props: Props) => {
    const handleNext = () => props.next();
    const handlePrev = () => props.prev();

    return (
        <Card className={cn("gap-3 mt-5 p-3 grid grid-cols-1 md:grid-cols-1 border-0", props.className)}>
            <BlockTitle title={props.title} className="md:col-span-2"/>
            <FileInput onSelect={(e) => props.setImages([(e as any).target.files[0], ...props.images])} />
            <div className="flex col-span-2 flex-wrap">
                {
                    props.images.map((image, index) => {
                        const srcUrl = URL.createObjectURL(image)
                        return <PictureCard key={srcUrl}
                                            src={srcUrl}
                                            index={index}
                                            onDelete={(i) => props.setImages([...props.images.slice(0, index), ...props.images.slice(index + 1)])}
                        />
                    })
                }
            </div>
            <div className="flex justify-between col-span-2 gap-2 mt-5">
                <Button
                    onClick={handlePrev}
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

export default Pictures;