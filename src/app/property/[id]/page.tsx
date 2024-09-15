import React from 'react';
import prisma from "@/lib/prisma";
import {notFound} from "next/navigation";
import PageTitle from "@/app/components/pageTitle";
import {Card, cn} from "@nextui-org/react";
import Title from "@/app/components/Title";
import {ImagesSlider} from "@/app/components/ImagesSlider";
import MapComponent from "@/app/components/MapComponent";
import {MapProvider} from "@/providers/map-provider";


interface Props {
    params: {
        id: string;
    }
}

interface IAttribute{
    label: string;
    value?: string|number;
}

const PropertyPage = async({params}: Props) => {
    const property = await prisma.property.findUnique({
        where: {
            id: Number(params.id)
        },
        include: {
            status: true,
            feature: true,
            location: true,
            contact: true,
            images: true
        }
    });

    if (!property) return notFound()

    return (
        <div>
           <PageTitle title={"Property Page"} href='/' linkCaption={"Back to Properties"} />
            <div className="p-3">
                <h2 className="text-2xl font-bold text-primary my-5">{property.name}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="col-span-2">
                        <ImagesSlider images={property.images.map(img => img.url)}  />
                    </div>
                    <Card className="p-3 flex flex-col gap-1">
                        <Title title="Features"/>
                        <Attribute label="Bedrooms" value={property.feature?.bedrooms}/>
                        <Attribute label="Bathrooms" value={property.feature?.bathrooms}/>
                        <Attribute label="Parking Spots" value={property.feature?.parkingSpots}/>
                        <Attribute label="Living Area" value={property.feature?.area}/>
                      <Title title="Adress" className="mt-7"/>
                        <Attribute label="City" value={property.location?.city}/>
                        <Attribute label="Landmarks" value={property.location?.landmark}/>
                        <Attribute label="Zip Code" value={property.location?.zip}/>
                        <Attribute label="Address" value={property.location?.streetAddress}/>
                      <Title title="Owner Details" className="mt-7"/>
                        <Attribute label="Owner name" value={property.contact?.name}/>
                        <Attribute label="Email" value={property.contact?.email}/>
                        <Attribute label="Phone" value={property.contact?.phone}/>
                    </Card>
                </div>
                <Card className="p-3 flex flex-col gap-1 mt-7">
                    <Title title="Description"/>
                    <h2 className="tex-2 font-bold text-slate-700">$ {property.price} / {property.status.value}</h2>
                    <p className="text-sm mt-5">{property.description}</p>
                </Card>
                <Card className="p-3 flex flex-col gap-1 mt-7">
                    <MapProvider>
                        <MapComponent />
                    </MapProvider>
                </Card>
            </div>
        </div>
    );
};

export default PropertyPage;


const Attribute = (props: IAttribute) => <div className="flex justify-between">
    <span className="text-sm text-slate-600">{props.label}</span>
    <span className="text-sm text-slate-600">{props.value}</span>
</div>