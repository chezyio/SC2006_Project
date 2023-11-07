const moment = require("moment");
import Image from "next/image";
import React from "react";

import HawkerCard from "./components/card/HawkerCard";
import Food from "../public/food.png";
import Navi from "../public/navi.png";
import Coffee from "../public/coffee.png";
import Food2 from "../public/food2.png";
import Calendar from "../public/calendar.png";

import { columns } from "./components/table/columns";
import { DataTable } from "./components/table/data-table";
import { DatePicker } from "./components/table/date-picker";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
                    <p className="text-sm font-semibold mb-6 text-neutral-500">
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
                                        Iconic Tastes
                                    </p>
                                    <p className="my-4 mb-10">
                                        Savor must-try local dishes and culinary
                                        specialties
                                    </p>
                                    <a
                                        href="/hawkers"
                                        className="rounded-full bg-blue-400 px-3.5 py-2.5 text-xs text-white"
                                    >
                                        Get Started
                                    </a>
                                </div>

                                <div className="basis-1/3 flex items-center py-8">
                                    <Image src={Food} alt="image" />
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1 rounded-xl bg-neutral-100">
                            <div className="px-16 pt-16">
                                <div>
                                    <p className="text-2xl lg:text-3xl font-bold">
                                        Convenience
                                    </p>
                                    <p className="my-4">
                                        Get the most out of your hawker center
                                        visits by staying informed
                                    </p>
                                </div>
                            </div>
                            <div className="px-16 relative bottom--4 dwaoverflow-hidden">
                                <Image src={Calendar} alt="image" />
                            </div>
                        </div>
                        <div className="rounded-xl bg-neutral-100">
                            <Image src={Coffee} alt="image" />
                            <div className="px-16 pb-16">
                                <p className="text-2xl font-bold mb-2">
                                    Information
                                </p>
                                <p className="text-md">
                                    Whether you&apos;re a local foodie or a
                                    curious traveler, our hawker center
                                    information check is your go-to resource for
                                    exploring the diverse world of street food.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-xl bg-neutral-100">
                            <Image src={Navi} alt="image" />
                            <div className="px-16 pb-16">
                                <p className="text-2xl font-bold mb-2">
                                    Adventure
                                </p>
                                <p className="text-md">
                                    Find out more about hawker centres around
                                    you
                                </p>
                            </div>
                        </div>
                        <div className="rounded-xl bg-neutral-100">
                            <Image src={Food2} alt="image" />
                            <div className="px-16 pb-16">
                                <p className="text-2xl font-bold mb-2">
                                    Community Vibes
                                </p>
                                <p className="text-md">
                                    Experience the local culture and mingle with
                                    the community
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-4xl font-bold my-12">Closure Dates</p>

                <DataTable columns={columns} data={data} />

                {/* <p className="text-4xl font-bold my-12">Nearby Dates</p>
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
                                        <CalendarDays />
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
                </div> */}
            </main>
        </div>
    );
}

// export default async function Home() {
//     const supabase = createServerComponentClient<Database>({ cookies });
//     const {
//         data: { session },
//     } = await supabase.auth.getSession();

//     if (!session) {
//         redirect("/unauthenticated");
//     }

//     const { data: todos } = await supabase.from("favourites").select();

//     return (
//         <>
//             <p>
//                 {todos.map((todo) => {
//                     return <div>{todo.hawker_id}</div>;
//                 })}
//             </p>
// <h1>Hello, {session.user.email}</h1>
//         </>
//     );
// }
