"use client"
import {Input, Select, SelectItem} from "@nextui-org/react";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebounce, useDebouncedCallback} from "use-debounce";
import {PrismaPromise, PropertyType} from "@prisma/client";


interface Props{
    types: PropertyType[]
}


const Search = ({types}:Props) => {

    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();





    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;

        const params = new URLSearchParams(searchParams);
        if (selectedValue) {
            params.set("type", selectedValue);
        } else {
            params.delete("type");
        }

        // Replace the URL with the new query parameters
        router.replace(`${pathName}?${params.toString()}`);
    }



    const handleChange = useDebouncedCallback( (query: string) => {
        const params = new URLSearchParams(searchParams);
        if (query) params.set("query", query);
        else params.delete("query");

        router.replace(`${pathName}?${params.toString()}`);
    }, 1000);

    return (
        <>
        <div className="flex flex-row gap-3 items-center justify-center w-full p-3 bg-gradient-to-b from-blue-500 to-blue-600">
            <Input
                className="w-96 rounded-md shadow-sm"
                endContent={<MagnifyingGlassIcon className="w-4 h-4 text-gray-700" /> }
                onChange={(e) => handleChange(e.target.value)}
                defaultValue={searchParams.get("query") ?? ""} //the query and the search are synchronized
            />
        </div>
        <div className="flex flex-row items-center p-3 border-1 border-b-blue-700 m-auto"  style={{ maxWidth: '1376px' }} >
                <Select
                    size="sm"
                    label="Select property type"
                    className="max-w-xs ml-auto border-1 border-blue-700 rounded-lg shadow-sm"
                    onChange={handleSelectChange}
                    selectionMode="single"
                >

                    {[{id: 0, value: "All"}, ...types]?.map(type => (
                        <SelectItem key={type.value.toLowerCase()} value={type.value}>
                            {type.value}
                        </SelectItem>
                    ))}
                </Select>
            </div>
        </>
    );
};

export default Search;