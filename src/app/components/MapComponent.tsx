'use client'
import { GoogleMap,  Marker } from "@react-google-maps/api";

interface Props{
    lat?: string | number
    lng?: string | number
}

export const defaultMapContainerStyle = {
    width: '100%',
    height: '50vh',
    borderRadius: '15px 0px 0px 15px',
};

const defaultMapCenter = {
    lat: 54.35295,
    lng: 18.65157
}

const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'roadmap',
};

const defaultMapZoom = 18

const MapComponent = ({lat, lng}: Props) => {

    return (
        <div className="w-full">
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}>
                 <Marker position={{ lat: 54.35295, lng: 18.65157 }} />
            </GoogleMap>
        </div>
    );
};

export default MapComponent;