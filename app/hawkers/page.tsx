import * as React from "react";
import { useState, useRef } from "react";
import Link from "next/link";
import HawkerCard from "../components/HawkerCard";

import { IoMdPin } from "react-icons/io";
import hawkers from "../utils/hawkers";
import { Suspense } from "react";
import Map2 from "../components/Map";

import Search from "../components/Search";

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

const page = async ({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const hawkers = await getHawkers();

    let all;
    const searchQuery = searchParams.search?.toString().toLowerCase();
    if (searchQuery) {
        const queryWords = searchQuery.split(" ");
        all = hawkers.filter((hawker) => {
            const name = hawker.name.toLowerCase();
            console.log(name);

            return queryWords.some((word) => name.includes(word));
        });
    }

    if (!searchQuery) {
        all = hawkers;
    }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Hawkers />
            <div className="w-full">
                <Map2 hawkers={allHawkers} />
            </div>

            <Search />

            <p className="text-4xl font-bold my-12">Hawkers</p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 my-24">
                {hawkers
                    // .filter((hawker) => hawker.name == searchParams?.search)
                    .map((hawker) => {
                        return (
                            // <Link
                            //     href={"/hawkers/" + hawker._id}
                            //     key={hawker._id}
                            // >
                            <HawkerCard hawker={hawker} />
                            // </Link>
                        );
                    })}
            </div>
        </Suspense>
    );
};

export default page;
