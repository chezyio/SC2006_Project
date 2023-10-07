import Link from "next/link";
import Image from "next/image";
import HawkerCard from "./components/HawkerCard";
import Campus from "../public/campus.svg";
import Review from "../public/review.png";
import Social from "../public/social.png";
import Sleep from "../public/sleep.png";
import Work from "../public/work.png";
import Student from "../public/student.png";

import { createClient } from "@supabase/supabase-js";

import Table from "./components/Table";

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

const supabaseUrl = "https://xvfstqmoxozecejgkhbo.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Home() {
    const hawkers = await getHawkers();

    return (
        <div>
            <main className="flex min-h-screen flex-col">
                <div className="text-center">
                    <p className="text-sm font-semibold mb-4">
                        Explore, Eat, Enjoy with HawkerHub
                    </p>
                    <p className="text-4xl lg:text-5xl font-bold mb-10">
                        Connecting Taste Buds,
                        <br />
                        One Hawker at a Time
                    </p>

                    <div className="relative flex h-96 w-full">
                        <Image
                            src="https://images.unsplash.com/photo-1624167481478-5faf64c87ecf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4140&q=80"
                            alt="image"
                            fill={true}
                            className="rounded-xl object-cover"
                        />
                    </div>
                </div>

                <div className="my-24">
                    <div className="text-center">
                        <p className="text-4xl lg:text-5xl font-bold mb-10">
                            Don't leave your dining <br />
                            experience to chance
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:row-span-2  rounded-2xl flex flex-col justify-between">
                            <Image src={Social} alt="image" />
                            <div className="p-8">
                                <p className="text-2xl font-bold mb-2">
                                    Experience
                                </p>
                                <p className="text-md">
                                    Use our information check to access hawker
                                    center insights, including specialty dishes,
                                    pricing, and user reviews, ensuring a
                                    satisfying meal.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-2 flex flex-col lg:flex-row  rounded-2xl">
                            <Image src={Work} alt="image" />
                            <div className="p-8">
                                <div>
                                    <p className="text-2xl font-bold mb-2">
                                        Stay Informed
                                    </p>
                                    <p className="text-md">
                                        Get the most out of your hawker center
                                        visits by staying informed. Our
                                        information check offers you stall
                                        recommendations, allergen information,
                                        and even special promotions
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className=" rounded-2xl">
                            <Image src={Sleep} alt="image" />
                            <div className="p-8">
                                <p className="text-2xl font-bold mb-2">
                                    Convenience
                                </p>
                                <p className="text-md">
                                    Whether you're a local foodie or a curious
                                    traveler, our hawker center information
                                    check is your go-to resource for exploring
                                    the diverse world of street food.
                                </p>
                            </div>
                        </div>
                        <div className=" rounded-2xl">
                            <Image src={Student} alt="image" />
                            <div className="p-8">
                                <p className="text-2xl font-bold mb-2">
                                    Campus Activities
                                </p>
                                <p className="text-md">
                                    Living on campus makes it easier to engage
                                    in various extracurricular activities,
                                    clubs, and organizations. Students can
                                    participate in events and opportunities that
                                    might not be as accessible to commuters.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-24">
                    <div className="flex flex-col lg:flex-row items-center justify-center">
                        <Image src={Review} alt="image" height={500} />
                        <div>
                            <p className="text-4xl font-bold mb-4">
                                Write a review
                            </p>
                            <p className="mb-8 text-neutral-600">
                                Share your experience at your college dorm by
                                writing a review. Your reviews are completely
                                anonymous.
                            </p>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-full">
                                Get started
                            </button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 my-24">
                    {hawkers.map((hawker) => {
                        return (
                            <Link
                                href={"/hawkers/" + hawker._id}
                                key={hawker._id}
                            >
                                <HawkerCard hawker={hawker} />
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
