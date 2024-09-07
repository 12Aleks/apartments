import {Card} from "@nextui-org/card";
import {Button, cn} from "@nextui-org/react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/16/solid";
import FileInput from "@/app/components/fileUpload";
import BlockTitle from "@/app/components/blockTitle";

interface Props {
    title: string;
    next: () => void;
    prev: () => void;
    className?: string;
    files: File[];
    setFiles: (files: File[]) => void;
}

const Files = (props: Props) => {
    const handleNext = () => props.next();
    const handlePrev = () => props.prev();


    return (
        <Card className={cn("gap-3 mt-5 p-3 grid grid-cols-1 md:grid-cols-1 border-0", props.className)}>
            <BlockTitle title={props.title} className="md:col-span-2"/>
            <FileInput/>
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

export default Files;