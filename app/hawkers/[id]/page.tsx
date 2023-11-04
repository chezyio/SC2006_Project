"use client";
const moment = require("moment");

import { useState, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { IoMdPin } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Store } from "lucide-react";

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
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";

import DateRangeComparison from "./DateComparison";

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

    const dateRanges = [
        {
            name: "Q1",
            start: q1d,
            end: result.q1_cleaningenddate,
        },
        {
            name: "Q2",
            start: q2d,
            end: result.q2_cleaningenddate,
        },
        {
            name: "Q3",
            start: q3d,
            end: result.q3_cleaningenddate,
        },
        {
            name: "Q4",
            start: q4d,
            end: result.q4_cleaningenddate,
        },
    ];
    return (
        <div className="">
            <div className="h-96 w-full relative my-4">
                <Image
                    src={result.photourl}
                    style={{ objectFit: "cover" }}
                    className="rounded-[8px]"
                    fill
                />
            </div>

            <p className="text-4xl font-bold">{result.name}</p>
            <p className="text-base my-2 text-neutral-500">
                {result.address_myenv}
            </p>
            <p className="text-xl my-8">{result.description_myenv}</p>

            <DateRangeComparison dateRanges={dateRanges} />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-12">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold">
                            Q1 Cleaning Date
                        </CardTitle>
                        <CalendarDays />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-semibold">
                            <Label className="text-neutral-500">
                                Start Date
                            </Label>
                            <br />
                            {result.q1_cleaningstartdate}
                            <Separator className="my-2" />
                            <Label className="text-neutral-500">End Date</Label>
                            <br />
                            {result.q1_cleaningenddate}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold">
                            Q2 Cleaning Date
                        </CardTitle>
                        <CalendarDays />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-semibold">
                            <Label className="text-neutral-500">
                                Start Date
                            </Label>
                            <br />
                            {result.q2_cleaningstartdate}
                            <Separator className="my-2" />
                            <Label className="text-neutral-500">End Date</Label>
                            <br />
                            {result.q2_cleaningenddate}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold">
                            Q3 Cleaning Date
                        </CardTitle>
                        <CalendarDays />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-semibold">
                            <Label className="text-neutral-500">
                                Start Date
                            </Label>
                            <br />
                            {result.q3_cleaningstartdate}
                            <Separator className="my-2" />
                            <Label className="text-neutral-500">End Date</Label>
                            <br />
                            {result.q3_cleaningenddate}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold">
                            Q4 Cleaning Date
                        </CardTitle>
                        <CalendarDays />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-semibold">
                            <Label className="text-neutral-500">
                                Start Date
                            </Label>
                            <br />
                            {result.q4_cleaningstartdate}
                            <Separator className="my-2" />
                            <Label className="text-neutral-500">End Date</Label>
                            <br />
                            {result.q4_cleaningenddate}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold">
                            Number of Food Stores
                        </CardTitle>
                        <Store />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-semibold">
                            {result.no_of_food_stalls}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold">
                            Number of Market Stores
                        </CardTitle>
                        <Store />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-semibold">
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
