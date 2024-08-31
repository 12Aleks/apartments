import React from 'react';
import {Card, Image} from "@nextui-org/react";
import {TrashIcon} from "@heroicons/react/16/solid";

interface IProps {
    src: string;
    key: string;
    index: number;
    onDelete: (index: number) => void;
}

const PictureCard = ({src, key, onDelete, index}: IProps) => {
    return (
        <Card key={key} className="p-1 mr-2 relative">
            <Image src={src} layout="responsive" className="w-36 h-36 object-contain bg-gray-200"/>
            <button
                onClick={() => onDelete(index)}
                className="absolute top-0 right-0 z-10 rounded-full bg-gray-300 border border-gray-400">
                <TrashIcon className="w-6 h-6 p-1 object-contain text-gray-600 rounded-lg"/>
            </button>
        </Card>
    );
};

export default PictureCard;