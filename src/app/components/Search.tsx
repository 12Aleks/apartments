"use client"
import {Input, Select, SelectItem, Slider} from "@nextui-org/react";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebounce, useDebouncedCallback} from "use-debounce";
import {PrismaPromise, PropertyType} from "@prisma/client";

interface PriceAggregate {
    _min: {
        price: number | null | undefined;
    };
    _max: {
        price: number | null | undefined;
    };
}


interface Props{
    types: PropertyType[]
    price: PriceAggregate

}


const Search = ({types, price}:Props) => {

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

    const handleSlider = useDebouncedCallback((value: number | number[]) => {

        const params = new URLSearchParams(searchParams);

        if (value instanceof Array ) {
            const minValue = value.at(0);
            const maxValue = value.at(1);
            minValue !== undefined && params.set("min", minValue.toString());
            maxValue !== undefined && params.set("max", maxValue.toString());
        } else {
            params.delete("type");
        }

        // Replace the URL with the new query parameters
        router.replace(`${pathName}?${params.toString()}`);
    }, 300)

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
        <div className="flex flex-row items-center justify-between p-3 border-b-1 border-b-blue-500 m-auto"  style={{ maxWidth: '1376px' }} >
               <Slider
                label="Price Range"
                size="sm"
                step={1}
                minValue={price._min?.price ?? 0}
                maxValue={price._max?.price ?? 0}
                defaultValue={[(price._min?.price ?? 0), (price._max?.price ?? 0) ]}
                formatOptions={{style: "currency", currency: "USD"}}
                className="max-w-md"
                onChange={handleSlider}
               />
                <Select
                    size="sm"
                    label="Select property type"
                    className="max-w-xs border-1 border-blue-500 rounded-lg shadow-sm"
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