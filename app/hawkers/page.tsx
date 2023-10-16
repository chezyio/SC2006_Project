import * as React from "react";
import { useState, useRef } from "react";
import HawkerCard from "../components/HawkerCard";

import { IoMdPin } from "react-icons/io";
import hawkers from "../utils/hawkers";
import { Suspense } from "react";
import Map2 from "../components/Map";

async function getHawkers() {
    const res = await fetch(
        "https://data.gov.sg/api/action/datastore_search?resource_id=b80cb643-a732-480d-86b5-e03957bc82aa&limit=9999"
    );
    const data = await res.json();

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return data.result.records;
}

let allHawkers;

async function Hawkers({ hawkerId }: { hawkerId: string }) {
    allHawkers = await getHawkers();
}

const page = ({ params: { hawkerId } }: { params: { hawkerId: string } }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Hawkers />
            <div className="h-full">
                <Map2 hawkers={allHawkers} />
            </div>
        </Suspense>
    );
};

export default page;
