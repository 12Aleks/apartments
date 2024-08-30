import React from 'react';
import {Card, Image} from "@nextui-org/react";

interface IProps {
    src: string;
    key: string
}

const PictureCard = ({src, key}: IProps) => {
    return (
        <Card key={key}>
            <Image src={src} layout="responsive" className="w-36 h-36 object-contain"/>
        </Card>
    );
};

export default PictureCard;