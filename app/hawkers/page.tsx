import * as React from "react";
import HawkerCard from "../components/card/HawkerCard";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../database.types";

import { Suspense } from "react";
import Map2 from "../components/Map";
import { getHawkers } from "../utils/hawkers";

const page = async () => {
    const hawkers = await getHawkers();

    const supabase = createServerComponentClient<Database>({ cookies });

    const {
        data: { user },
    } = await supabase.auth.getUser();
    console.log(user);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="w-full">
                <Map2 hawkers={hawkers} />
            </div>
            <p className="text-4xl font-bold my-12">Hawkers</p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 my-24">
                {hawkers.map((hawker) => {
                    return (
                        <HawkerCard
                            key={hawker._id}
                            hawker={hawker}
                            userId={user ? user.id : null} // Check if user exists
                        />
                    );
                })}
            </div>
        </Suspense>
    );
};

export default page;
