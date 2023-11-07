"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";

import { supabase } from "../../utils/supabase";

const HawkerCard = ({ hawker, userId }) => {
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        async function checkIfFavorited() {
            if (userId) {
                // Fetch the user's favorites
                const { data, error } = await supabase
                    .from("favourites")
                    .select("hawker_id")
                    .eq("user_id", userId);


                if (error) {
                    console.error("Error fetching favorites:", error);
                    return;
                }

                // Check if the hawker's ID is in the user's favorites
                const hawkerIds = data.map((fav) => fav.hawker_id);
                if (hawkerIds.includes(hawker._id)) {
                    setIsFav(true);
                }
            }
        }

        checkIfFavorited();
    }, [userId, hawker._id]);

    const toggleFav = async () => {
        try {
            const { data: favorites, error: favoritesError } = await supabase
                .from("favourites")
                .select("hawker_id")
                .eq("user_id", userId);

            if (favoritesError) {
                console.error("Error checking favorite:", favoritesError);
                return;
            }

            const isAlreadyFavorited = favorites.some(
                (fav) => fav.hawker_id === hawker._id
            );

            if (isAlreadyFavorited) {
                await supabase
                    .from("favourites")
                    .delete()
                    .eq("user_id", userId)
                    .eq("hawker_id", hawker._id);
                setIsFav(!isFav);
            } else {
                await supabase.from("favourites").insert([
                    {
                        user_id: userId,
                        hawker_id: hawker._id,
                        hawker: hawker,
                    },
                ]);
                setIsFav(!isFav);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    return (
        <Card className="h-full flex flex-col justify-between">
            <Link href={"/hawkers/" + hawker._id} key={hawker._id}>
                <div className="h-48 w-full relative">
                    <Image
                        src={hawker.photourl}
                        alt="image"
                        className="rounded-t-[8px] max-h-48 relative"
                        style={{ objectFit: "cover" }}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <CardHeader>
                    <CardTitle>{hawker.name}</CardTitle>
                    <CardDescription>{hawker.address_myenv}</CardDescription>
                </CardHeader>
            </Link>
            <CardContent>
                {userId && (
                    <Toggle pressed={isFav} onPressedChange={() => toggleFav()}>
                        {isFav ? "Remove from Favorites" : "Add to Favorites"}
                    </Toggle>
                )}
            </CardContent>
        </Card>
    );
};

export default HawkerCard;
