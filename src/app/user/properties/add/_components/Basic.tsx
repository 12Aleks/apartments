import {UnitOrganization, UnitType} from "@prisma/client";
import {Card} from "@nextui-org/card";
import {cn, Input, Textarea, Select, SelectItem} from "@nextui-org/react";



interface Props{
    className?: string;
    organizationTypes: UnitOrganization[]
    types: UnitType[]
}

const Basic = (props: Props) => {
    return (
        <Card className={cn("gap-3 mt-5 p-3 grid grid-cols-1 md:grid-cols-2 border-0")}>
            <Input label="title" className="md:col-span-2" />
            <Textarea label="description" className="md:col-span-2" />
            <div className="md:col-span-1 flex flex-col gap-3">
                <Select label="Organization" className="w-full" selectionMode="single">
                    {props.organizationTypes.map((organization) => (
                        <SelectItem key={organization.id} value={organization.id}>
                            {organization.value}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="md:col-span-1 flex flex-col gap-3">
                <Select label="Unit type" className="w-full" selectionMode="single">
                    {props.types.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                            {type.value}
                        </SelectItem>
                    ))}
                </Select>
            </div>
        </Card>
    );
};

export default Basic;