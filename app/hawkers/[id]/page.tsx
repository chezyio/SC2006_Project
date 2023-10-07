"use client";
import { useState, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { IoMdPin } from "react-icons/io";

import Link from "next/link";

import Map, {
    Marker,
    Popup,
    NavigationControl,
    GeolocateControl,
} from "react-map-gl";

import classes from "./Page.module.css";

import airports from "../../../airports.json";

async function getHawkers(id) {
    const res = await fetch(
        "https://data.gov.sg/api/action/datastore_search?resource_id=b80cb643-a732-480d-86b5-e03957bc82aa&limit=9999"
    );
    const data = await res.json();
    const x = data.result.records.find((hawker) => hawker._id == id);

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return x;
}

const page = async ({ params: { id } }: { params: { id: string } }) => {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [selectedMarker, setSelectedMarker] = useState(null);
    const mapRef = useRef(null);

    const result = await getHawkers(id);

    const zoomToSelectedLoc = (e, result) => {
        // stop event bubble-up which triggers unnecessary events
        e.stopPropagation();
        setSelectedMarker({ result });
        mapRef.current.flyTo({
            center: [result.longitude_hc, result.latitude_hc],
            zoom: 20,
        });
    };

    return (
        <div className={classes.mainStyle}>
            <p className="text-2xl font-bold">{result.name}</p>
            <p className="text-base">{result.no_of_market_stalls}</p>
            <p className="text-base">{result.no_of_food_stalls}</p>
            <p className="text-base">{result.description}</p>
            <Map
                mapboxAccessToken={mapboxToken}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                // style={classes.mapStyle}
                initialViewState={{
                    latitude: 1.3521,
                    longitude: 103.8198,
                    zoom: 10,
                }}
                maxZoom={20}
                minZoom={3}
                ref={mapRef}
                // attributes...
            >
                {/*Geolocate and Navigation controls...*/}
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
                        <h3 className={classes.popupTitle}>
                            {selectedMarker.result.name}
                        </h3>
                        <div className={classes.popupInfo}>
                            <label className={classes.popupLabel}>Code: </label>
                            <span>{selectedMarker.airport.code}</span>
                            <br />
                            <label className={classes.popupLabel}>
                                Country:{" "}
                            </label>
                            <span>{selectedMarker.airport.country}</span>
                            <br />
                            <label className={classes.popupLabel}>
                                Website:{" "}
                            </label>
                            <Link
                                href={
                                    selectedMarker.airport.url === ""
                                        ? "#"
                                        : selectedMarker.airport.url
                                }
                                target={
                                    selectedMarker.airport.url === ""
                                        ? null
                                        : "_blank"
                                }
                                className={classes.popupWebUrl}
                            >
                                {selectedMarker.airport.url === ""
                                    ? "Nil"
                                    : selectedMarker.airport.url}
                            </Link>
                        </div>
                    </Popup>
                ) : null}

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
                        {<IoMdPin size={30} color="tomato" />}
                    </button>
                </Marker>

                {/* {airports.map((airport, index) => {
                    return (
                        <Marker
                            key={index}
                            longitude={airport.lon}
                            latitude={airport.lat}
                        >
                            <button
                                type="button"
                                className="cursor-pointer"
                                onClick={(e) =>
                                    zoomToSelectedLoc(e, airport, index)
                                }
                            >
                                {<IoMdAirplane size={30} color="tomato" />}
                            </button>
                        </Marker>
                    );
                })} */}
            </Map>
        </div>
    );
};

export default page;
