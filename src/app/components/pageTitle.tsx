import React from 'react';
import Link from "next/link";

interface IPageTitleProps {
    title?: string;
    href?: string;
    linkCaption?: string;
}


const PageTitle = (props: IPageTitleProps) => {
    return (
        <div className="p-4 bg-gradient-to-b from-gray-100 rounded-lg flex justify-between">
            <h1 className="text-gray-400 text-xl font-medium">{props.title}</h1>
            {props.href!! &&
                <Link className="text-gray-400 hover:text-gray-600 transition-colors" href={props.href}>{props.linkCaption}</Link>}
        </div>
    );
};

export default PageTitle;