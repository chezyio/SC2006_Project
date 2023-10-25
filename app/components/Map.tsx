"use client";
import { useState, useRef } from "react";

import Map, {
    Marker,
    Popup,
    NavigationControl,
    GeolocateControl,
} from "react-map-gl";

import Link from "next/link";

import Image from "next/image";
import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import { IoMdPin } from "react-icons/io";

const Map2 = ({ hawkers }) => {
    const [selectedMarker, setSelectedMarker] = useState(null);

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
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
                initialViewState={{
                    latitude: 1.3521,
                    longitude: 103.8198,
                    zoom: 10,
                }}
                style={{ width: "100%", height: 800, borderRadius: "8px" }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                maxZoom={16}
                minZoom={3}
                ref={mapRef}
            >
                <GeolocateControl position="top-left" />
                <NavigationControl position="top-left" />

                {selectedMarker ? (
                    <Popup
                        offset={25}
                        latitude={selectedMarker.result.latitude_hc}
                        longitude={selectedMarker.result.longitude_hc}
                        onClose={() => {
                            setSelectedMarker(null);
                        }}
                        closeButton={false}
                    >
                        <Image
                            src={selectedMarker.result.photourl}
                            alt="image"
                            className=" max-h-64 relative"
                            objectFit="cover"
                            width={500}
                            height={200}
                        />

                        <p className="text-base font-bold">
                            {selectedMarker.result.name}
                        </p>
                        <div>
                            <label>Location: </label>
                            <span>{selectedMarker.result.address_myenv}</span>
                            <br />
                            <label>Number of Market Stores: </label>
                            <span>
                                {selectedMarker.result.no_of_market_stalls}
                            </span>
                            <br />
                            <label>Number of Food Stores: </label>
                            <span>
                                {selectedMarker.result.no_of_food_stalls}
                            </span>
                            <br />

                            <Link
                                href={
                                    selectedMarker.result.url === ""
                                        ? "#"
                                        : selectedMarker.result.google_3d_view
                                }
                                target={
                                    selectedMarker.result.google_3d_view === ""
                                        ? null
                                        : "_blank"
                                }
                                className="text-blue-500"
                            >
                                {selectedMarker.result.google_3d_view === ""
                                    ? "Nil"
                                    : selectedMarker.result.google_3d_view}
                            </Link>
                        </div>
                    </Popup>
                ) : null}

                {hawkers?.map((hawker, index) => {
                    return (
                        <Marker
                            key={index}
                            longitude={hawker.longitude_hc}
                            latitude={hawker.latitude_hc}
                        >
                            <button
                                type="button"
                                className="cursor-pointer"
                                onClick={(e) =>
                                    zoomToSelectedLoc(e, hawker, index)
                                }
                            >
                                {<IoMdPin size={30} color="tomato" />}
                            </button>
                        </Marker>
                    );
                })}
            </Map>
        </div>
    );
};

export default Map2;
