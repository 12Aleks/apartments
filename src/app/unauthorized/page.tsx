import React from 'react';
import {NoSymbolIcon} from "@heroicons/react/16/solid";
import Link from "next/link";

const UnauthorizedPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
           <div className="flex flex-col items-center justify-center bg-gray-200 border-1 border-gray-300 p-5 rounded-md">
               <NoSymbolIcon className="w-36 h-36 text-slate-700" />
               <p className="text-xl mt-4 capitalize">Sorry! You are not authorized to do this action</p>
               <Link href="/" className="mt-4 text-sm capitalize">Return to home page</Link>
           </div>
        </div>
    );
};

export default UnauthorizedPage;