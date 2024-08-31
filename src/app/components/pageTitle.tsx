import React from 'react';
import Link from "next/link";

interface IPageTitleProps {
    title?: string;
    href?: string;
    linkCaption?: string;
}


const PageTitle = (props: IPageTitleProps) => {
    return (
        <div className="p-3 bg-gradient-to-b from-primary-400 bg-primary-400 flex justify-between">
            <h1 className="text-white text-xl font-medium tracking-wider">{props.title}</h1>
            {props.href!! &&
                <Link className="text-white hover:text-gray-100 transition-colors" href={props.href}>{props.linkCaption}</Link>}
        </div>
    );
};

export default PageTitle;