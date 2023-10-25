"use client";
const moment = require("moment");

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

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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

    const q1d = moment(result.q1_cleaningstartdate, "DD/MM/YYYY");
    const q2d = moment(result.q2_cleaningstartdate, "DD/MM/YYYY");
    const q3d = moment(result.q3_cleaningstartdate, "DD/MM/YYYY");
    const q4d = moment(result.q4_cleaningstartdate, "DD/MM/YYYY");

    const today = moment();

    const diff1 = q1d.diff(today, "days");
    const diff2 = q2d.diff(today, "days");
    const diff3 = q3d.diff(today, "days");
    const diff4 = q4d.diff(today, "days");

    return (
        <div>
            <p className="text-4xl font-bold">{result.name}</p>
            <p className="text-base my-4">{result.address_myenv}</p>
            <p className="text-base">{result.description_myenv}</p>

            <>
                {diff1 > 0 || diff2 > 0 || diff3 > 0 || diff4 > 0 ? (
                    <p className="text-4xl font-bold">
                        {diff4} days to next cleaning day
                    </p>
                ) : (
                    <p>testing</p>
                )}
            </>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-12">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Q1 Cleaning Date
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#171717"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-calendar-days"
                        >
                            <rect
                                width="18"
                                height="18"
                                x="3"
                                y="4"
                                rx="2"
                                ry="2"
                            />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                            <path d="M8 14h.01" />
                            <path d="M12 14h.01" />
                            <path d="M16 14h.01" />
                            <path d="M8 18h.01" />
                            <path d="M12 18h.01" />
                            <path d="M16 18h.01" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {result.q1_cleaningstartdate} to{" "}
                            {result.q1_cleaningenddate}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Q2 Cleaning Date
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#171717"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-calendar-days"
                        >
                            <rect
                                width="18"
                                height="18"
                                x="3"
                                y="4"
                                rx="2"
                                ry="2"
                            />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                            <path d="M8 14h.01" />
                            <path d="M12 14h.01" />
                            <path d="M16 14h.01" />
                            <path d="M8 18h.01" />
                            <path d="M12 18h.01" />
                            <path d="M16 18h.01" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {result.q2_cleaningstartdate} to{" "}
                            {result.q2_cleaningenddate}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Q3 Cleaning Date
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#171717"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-calendar-days"
                        >
                            <rect
                                width="18"
                                height="18"
                                x="3"
                                y="4"
                                rx="2"
                                ry="2"
                            />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                            <path d="M8 14h.01" />
                            <path d="M12 14h.01" />
                            <path d="M16 14h.01" />
                            <path d="M8 18h.01" />
                            <path d="M12 18h.01" />
                            <path d="M16 18h.01" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {result.q3_cleaningstartdate} to{" "}
                            {result.q3_cleaningenddate}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Q4 Cleaning Date
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#171717"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-calendar-days"
                        >
                            <rect
                                width="18"
                                height="18"
                                x="3"
                                y="4"
                                rx="2"
                                ry="2"
                            />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                            <path d="M8 14h.01" />
                            <path d="M12 14h.01" />
                            <path d="M16 14h.01" />
                            <path d="M8 18h.01" />
                            <path d="M12 18h.01" />
                            <path d="M16 18h.01" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {result.q4_cleaningstartdate} to{" "}
                            {result.q4_cleaningenddate}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Number of Food Stores
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#171717"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-store"
                        >
                            <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                            <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                            <path d="M2 7h20" />
                            <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {result.no_of_food_stalls}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Number of Market Stores
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#171717"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-store"
                        >
                            <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                            <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                            <path d="M2 7h20" />
                            <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {result.no_of_market_stalls}
                        </div>
                    </CardContent>
                </Card>
            </div>
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
                                <label className={classes.popupLabel}>
                                    Code:{" "}
                                </label>
                                <span>{selectedMarker.result.code}</span>
                                <br />
                                <label className={classes.popupLabel}>
                                    Country:{" "}
                                </label>
                                <span>{selectedMarker.result.country}</span>
                                <br />
                                <label className={classes.popupLabel}>
                                    Website:{" "}
                                </label>
                                <Link
                                    href={
                                        selectedMarker.result.url === ""
                                            ? "#"
                                            : selectedMarker.result.url
                                    }
                                    target={
                                        selectedMarker.result.url === ""
                                            ? null
                                            : "_blank"
                                    }
                                    className={classes.popupWebUrl}
                                >
                                    {selectedMarker.result.url === ""
                                        ? "Nil"
                                        : selectedMarker.result.url}
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
                </Map>
            </div>
        </div>
    );
};

export default page;
