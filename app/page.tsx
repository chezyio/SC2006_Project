import Link from "next/link";
import Image from "next/image";
import React from "react";

import HawkerCard from "./components/HawkerCard";
import Food from "../public/food.png";
import Navi from "../public/navi.png";
import Coffee from "../public/coffee.png";
import Student from "../public/student.png";
import Food2 from "../public/food2.png";

import { createClient } from "@supabase/supabase-js";

import { useSearchParams } from "next/navigation";

import { Payment, columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { DatePicker } from "./components/date-picker";
import hawkers from "./utils/hawkers";

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

function addWeeks(date, weeks) {
    date.setDate(date.getDate() + 7 * weeks);

    return date;
}

const supabaseUrl = "https://xvfstqmoxozecejgkhbo.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Home() {
    const data = await getHawkers();

    return (
        <div>
            <main className="flex min-h-screen flex-col">
                <div className="text-center my-12">
                    <p className="text-sm font-semibold mb-6">
                        Explore, Eat, Enjoy with HawkerHub
                    </p>
                    <p className="text-4xl lg:text-5xl font-bold mb-10">
                        Connecting Taste Buds,
                        <br />
                        One Hawker at a Time
                    </p>
                </div>

                <div className="">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2 rounded-xl bg-neutral-100">
                            <div className="flex flex-row">
                                <div className="py-24 pl-24 basis-2/3">
                                    <p className="text-3xl lg:text-3xl font-bold">
                                        Connecting Taste Buds,
                                        <br />
                                        One Hawker at a Time
                                    </p>
                                    <p className="my-4 mb-10">
                                        Use our information check to access
                                        hawker center insights, including
                                        specialty dishes, pricing, and user
                                        reviews, ensuring a satisfying meal
                                    </p>
                                    <a
                                        href="#"
                                        className="rounded-full bg-blue-400 px-3.5 py-2.5 text-xs text-white"
                                    >
                                        Get Started
                                    </a>
                                </div>

                                <div className="basis-1/3 flex items-center">
                                    <Image src={Food} alt="image" />
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1 rounded-xl bg-neutral-100">
                            {/* <Image src={Work} alt="image" /> */}
                            <div className="p-16">
                                <div>
                                    <p className="text-2xl lg:text-3xl font-bold">
                                        Convenience
                                    </p>
                                    <p className="my-4">
                                        Get the most out of your hawker center
                                        visits by staying informed. Our
                                        information check offers you stall
                                        recommendations, allergen information,
                                        and even special promotions
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl bg-neutral-100">
                            <Image src={Coffee} alt="image" />
                            <div className="px-16 pb-16">
                                <p className="text-2xl font-bold mb-2">
                                    Information
                                </p>
                                <p className="text-md">
                                    Whether you're a local foodie or a curious
                                    traveler, our hawker center information
                                    check is your go-to resource for exploring
                                    the diverse world of street food.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-xl bg-neutral-100">
                            <Image src={Navi} alt="image" />
                            <div className="px-16 pb-16">
                                <p className="text-2xl font-bold mb-2">
                                    Location
                                </p>
                                <p className="text-md">
                                    Find out what's nearby
                                </p>
                            </div>
                        </div>
                        <div className="rounded-xl bg-neutral-100">
                            <Image src={Food2} alt="image" />
                            <div className="px-16 pb-16">
                                <p className="text-2xl font-bold mb-2">x </p>
                                <p className="text-md">x</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-4xl font-bold my-12">Closure Dates</p>

                <DataTable columns={columns} data={data} />

                <p className="text-4xl font-bold my-12">Nearby Dates</p>
                <DatePicker />
                <br />
                <p>
                    Below are the list of hawkers which are going to be closed
                    for the specified date
                </p>
                <br />

                <div>
                    {data.map((h) => {
                        const test = h.q4_cleaningstartdate;
                        if (test != "TBC") {
                            const q4d = new Date(
                                h.q4_cleaningstartdate
                            ).toLocaleDateString("en-US");

                            const cur = new Date();
                            const addedCur = addWeeks(
                                cur,
                                5
                            ).toLocaleDateString("en-GB");

                            if (q4d < addedCur) {
                                // api date format = ddmmyyyy
                                // system date format = mmddyyyy
                                return (
                                    <div>
                                        <div>
                                            {h.name} - Q4 Start date —{" "}
                                            {h.q4_cleaningstartdate}
                                            is before modified date {addedCur}
                                        </div>
                                    </div>
                                );
                            }
                        }
                    })}
                </div>
            </main>
        </div>
    );
}
