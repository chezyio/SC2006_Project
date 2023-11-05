"use client";
import React from "react";

import { useState, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { IoMdPin } from "react-icons/io";

import Map, {
    Marker,
    Popup,
    NavigationControl,
    GeolocateControl,
} from "react-map-gl";

const HawkerMap = ({ result }) => {
    console.log(result);
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [selectedMarker, setSelectedMarker] = useState(null);
    const mapRef = useRef(null);

    const zoomToSelectedLoc = (e, result) => {
        e.stopPropagation();
        setSelectedMarker({ result });
        mapRef.current.flyTo({
            center: [result.longitude_hc, result.latitude_hc],
            zoom: 20,
        });
    };

    return (
        <div>
            <Map
                mapboxAccessToken={mapboxToken}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                initialViewState={{
                    latitude: 1.3521,
                    longitude: 103.8198,
                    zoom: 10,
                }}
                style={{ width: "100%", height: 800, borderRadius: "8px" }}
                maxZoom={20}
                minZoom={3}
                ref={mapRef}
            >
                <GeolocateControl position="top-left" />
                <NavigationControl position="top-left" />

                <Marker
                    key={result._id}
                    longitude={result.longitude_hc}
                    latitude={result.latitude_hc}
                >
                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={(e) => zoomToSelectedLoc(e, result)}
                    >
                        <IoMdPin size={30} color="tomato" />
                    </button>
                </Marker>
            </Map>
        </div>
    );
};

export default HawkerMap;
