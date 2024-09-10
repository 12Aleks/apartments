import {ReactNode} from 'react';
import {Button} from "@nextui-org/react";
import Link from "next/link";

interface IProps{
    children?: ReactNode;
}

const UnitsLayout = ({children}: IProps) => {
    return (
        <div>
            <div className="bg-primary-400 flex justify-between items-center p-2">
                <h1 className="text-white text-xl font-medium px-2 tracking-wider">User Properties</h1>
                <Button className="bg-primary-100 hover:bg-primary-100 transition-background text-gray-800 text-medium">
                    <Link href="/user/properties/add">Add property</Link>
                </Button>
            </div>
            {children}
        </div>
    );
};

export default UnitsLayout;