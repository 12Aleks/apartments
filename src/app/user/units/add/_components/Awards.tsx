import {useState} from 'react';
import {Button, cn, Input} from  "@nextui-org/react";
import {Card} from "@nextui-org/card";
import {ChevronLeftIcon, ChevronRightIcon, PlusCircleIcon} from "@heroicons/react/16/solid";
import BlockTitle from "@/app/components/blockTitle";

interface Props {
    title: string;
    prev: () => void;
    className?: string;
}

const Awards = (props: Props) => {
    const [surnames, setSurnames] = useState<string[]>(['']);
    const handlePrev = () => props.prev();


    const handleSurnameChange = (index: number, value: string) => {
        const newSurnames = [...surnames];
        newSurnames[index] = value;
        setSurnames(newSurnames);

        // If the user is typing in the last input, add a new empty input
        if (index === surnames.length - 1 && value !== '') {
            setSurnames([...newSurnames, '']);
        }
    };


    return (
        <Card className={cn("gap-3 mt-5 p-3 grid grid-cols-1 md:grid-cols-1 border-0", props.className)}>
            <BlockTitle title={props.title} className="md:col-span-2"/>

            <div className="grid gap-3">
                <h2 className="grid gap-3 mt-4 mb-2 text-lg text-gray-600">Lists of Victoria Cross recipients:</h2>
                {surnames.map((surname, index) => (
                    <Input
                        key={index}
                        value={surname}
                        onChange={(e) => handleSurnameChange(index, e.target.value)}
                        placeholder={`Add a recipient`}
                        className="col-span-1"
                    />
                ))}
            </div>

            <div className="flex justify-between col-span-2 gap-2 mt-5">
                <Button
                    onClick={handlePrev}
                    startContent={<ChevronLeftIcon className="w-6"/>}
                    color="primary" className="w-40">Previous</Button>
                <Button
                    endContent={<PlusCircleIcon className="w-6"/>}
                    className="w-40 text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2">Create</Button>
            </div>
        </Card>
    );
};

export default Awards;