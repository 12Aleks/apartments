"use client"
import {Input} from "@nextui-org/react";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebounce, useDebouncedCallback} from "use-debounce";

const Search = () => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();


    const handleChange = useDebouncedCallback( (query: string) => {
        const params = new URLSearchParams(searchParams);
        if (query) params.set("query", query);
        else params.delete("query");

        router.replace(`${pathName}?${params.toString()}`);
    }, 1000);

    return (
        <div className="flex flex-col items-center justify-center w-full p-3 bg-gradient-to-b from-blue-500 to-blue-600">
            <Input
                className="w-96 shadow"
                endContent={<MagnifyingGlassIcon className="w-4 h-4 text-gray-700" /> }
                onChange={(e) => handleChange(e.target.value)}
                defaultValue={searchParams.get("query") ?? ""} //the query and the search are synchronized
            />
        </div>
    );
};

export default Search;