import React from 'react';

interface Props {
    title: string;
    className?: string;
}

const Title = (props: Props) => {
    return (
        <div className={props.className}>
            <h2 className="text-xl font-bold text-slate-700">
                {props.title}
            </h2>
            <hr className={`border-gray-400 my-2 border-solid`} />
        </div>
    );
};

export default Title;