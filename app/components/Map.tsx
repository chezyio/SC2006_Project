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

import classes from "./Map.module.css";

async function getHawkers() {
    const res = await fetch(
        "https://data.gov.sg/api/action/datastore_search?resource_id=b80cb643-a732-480d-86b5-e03957bc82aa&limit=9999"
    );
    const data = await res.json();
    const x = data.result.records;

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return x;
}

const result = getHawkers();

const page = () => {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [selectedMarker, setSelectedMarker] = useState(null);
    const mapRef = useRef(null);

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

                {/* {selectedMarker ? (
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
                        </div>
                    </Popup>
                ) : null} */}
                {/* 
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
                </Marker> */}

                {result.map((r, index) => {
                    return (
                        <Marker key={index} longitude={r.lon} latitude={r.lat}>
                            <button
                                type="button"
                                className="cursor-pointer"
                                onClick={(e) => zoomToSelectedLoc(e, r, index)}
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

export default page;
