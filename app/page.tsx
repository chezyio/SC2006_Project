const moment = require("moment");
import Image from "next/image";
import React from "react";

import HawkerCard from "./components/HawkerCard";
import Food from "../public/food.png";
import Navi from "../public/navi.png";
import Coffee from "../public/coffee.png";
import Food2 from "../public/food2.png";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { DatePicker } from "./components/date-picker";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-12">
                    {data.map((h) => {
                        const mydate = moment(
                            h.q4_cleaningstartdate,
                            "DD/MM/YYYY"
                        );
                        const modified = moment(mydate);

                        const today = moment();

                        const cur = moment().add(4, "weeks");

                        if (cur > modified && modified > today) {
                            return (
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {h.name}
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
                                            className="lucide lucide-calendar-days"
                                        >
                                            <rect
                                                width="18"
                                                height="18"
                                                x="3"
                                                y="4"
                                                rx="2"
                                                ry="2"
                                            />
                                            <line
                                                x1="16"
                                                x2="16"
                                                y1="2"
                                                y2="6"
                                            />
                                            <line x1="8" x2="8" y1="2" y2="6" />
                                            <line
                                                x1="3"
                                                x2="21"
                                                y1="10"
                                                y2="10"
                                            />
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
                                            {h.q4_cleaningstartdate}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        }
                    })}
                </div>
            </main>
        </div>
    );
}
