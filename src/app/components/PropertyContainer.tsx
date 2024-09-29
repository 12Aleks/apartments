import {PropsWithChildren} from "react";
import PaginationContainer from "@/app/components/PaginationContainer";

type Props = PropsWithChildren<{
    totalPages: number;
    currentPage: number;
}>;

const PropertyContainer = ({children, currentPage, totalPages} : Props) => {
    return (
        <div className="p-5 flex flex-col gap-10 items-center" style={{minHeight: `calc(100vh - 130px)`}}>
            <div className="grid grid-cols-4 gap-8">{children}</div>
            <div className="mt-auto mb-3 pt-3">
                <PaginationContainer totalPages={totalPages} currentPage={currentPage}/>
            </div>
        </div>
    );
};

export default PropertyContainer;