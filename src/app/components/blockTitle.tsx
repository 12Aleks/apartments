import {cn} from "@nextui-org/react";

interface IPageTitleProps {
    title: string;
    className?: string;
}

const BlockTitle = (props: IPageTitleProps) => {
    return (
        <div className={cn("p-3 from-primary-400 bg-gray-100 flex justify-between rounded", props.className)}>
            <h1 className="text-gray-600 text-xl font-medium">{props.title}</h1>
        </div>
    );
};

export default BlockTitle;