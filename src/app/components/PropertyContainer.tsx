import {PropsWithChildren} from "react";

type Props = PropsWithChildren;

const PropertyContainer = ({children} : Props) => {
    return (
        <div className="p-5 flex flex-col gap-10 items-center">
            <div className="grid grid-cols-4 gap-8">{children}</div>
        </div>
    );
};

export default PropertyContainer;