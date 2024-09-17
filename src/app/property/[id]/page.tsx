import React from 'react';
import prisma from "@/lib/prisma";
import {notFound} from "next/navigation";
import PageTitle from "@/app/components/pageTitle";
import {Card} from "@nextui-org/react";
import Title from "@/app/components/Title";
import {ImagesSlider} from "@/app/components/ImagesSlider";
import MapComponent from "@/app/components/MapComponent";
import {MapProvider} from "@/providers/map-provider";
import Link from "next/link";
import {MapIcon} from "@heroicons/react/16/solid";


interface Props {
    params: {
        id: string;
    }
}

interface IAttribute {
    label: string;
    value?: string | number;
}

const PropertyPage = async ({params}: Props) => {
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
            <PageTitle title={"Property Page"} href='/' linkCaption={"Back to Properties"}/>
            <div className="p-3">
                <div className="flex items-center w-full">
                    <h2 className="text-2xl font-bold text-primary my-5 mr-4">{property.name}</h2>
                    <hr className="flex-grow border-blue-700 my-2 border-solid"/>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="col-span-2">
                        <ImagesSlider images={property.images.map(img => img.url)}/>
                    </div>
                    <Card className="p-3 flex flex-col gap-1">
                        <div className="flex flex-row justify-between gap-1">
                            <h4 className="text-xs text-slate-600 mb-5">Published: {property.createAt.toLocaleDateString()} </h4>
                            <h4 className="text-xs text-slate-600 mb-5">Last
                                change: {property.updateAt.toLocaleDateString()} </h4>
                        </div>

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
                        <Link href="#map-section" className="tex-2 text-blue-700 hover:text-blue-900 flex">
                            <h2>See location on the map</h2><MapIcon className="w-6 ms-1"/>
                        </Link>
                        <Title title="Owner Details" className="mt-7"/>
                        <Attribute label="Owner name" value={property.contact?.name}/>
                        <Attribute label="Email" value={property.contact?.email}/>
                        <Attribute label="Phone" value={property.contact?.phone}/>
                        <Title title="Price" className="mt-7"/>
                        <h2 className="tex-2 font-bold text-blue-700">$ {property.price} / {property.status.value}</h2>
                    </Card>
                </div>
                <Card className="p-3 flex flex-col gap-1 mt-7">
                    <Title title="Description"/>

                    <pre
                        className="text-sm break-words whitespace-pre-wrap mt-5 overflow-hidden">{property.description}</pre>
                </Card>
                {property.location?.lat && property.location?.lng && (
                    <>
                        <Card className="p-3 flex flex-col gap-1 mt-7">
                            <MapProvider>
                                <MapComponent lat={Number(property.location?.lat)}
                                              lng={Number(property.location?.lng)}/>
                            </MapProvider>
                        </Card>
                        <div id="map-section"></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PropertyPage;


const Attribute = (props: IAttribute) => <div className="flex justify-between ">
    <span className="text-sm text-slate-600 hover:text-slate-900">{props.label}</span>
    <span className="text-sm text-slate-600 hover:text-slate-900">{props.value}</span>
</div>