import {PropsWithChildren} from "react";
import PaginationContainer from "@/app/components/PaginationContainer";

type Props = PropsWithChildren<{
    totalPages: number;
    currentPage: number;
}>;

const PropertyContainer = ({children, currentPage, totalPages} : Props) => {
    return (
        <div className="p-5 flex flex-col gap-10 items-center">
            <div className="grid grid-cols-4 gap-8">{children}</div>
            <PaginationContainer totalPages={totalPages} currentPage={currentPage}/>
        </div>
    );
};

export default PropertyContainer;