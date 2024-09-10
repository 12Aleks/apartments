import {cn} from "@nextui-org/react";

interface IPageTitleProps {
    title: string;
    className?: string;
}

const BlockTitle = (props: IPageTitleProps) => {
    return (
        <div className={cn("p-3 from-primary-400 bg-gray-300 flex justify-between rounded-t-md rounded-b-sm", props.className)}>
            <h1 className="text-gray-500 text-xl font-medium tracking-wider">{props.title}</h1>
        </div>
    );
};

export default BlockTitle;