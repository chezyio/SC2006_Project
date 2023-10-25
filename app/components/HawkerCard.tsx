// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Toggle } from "@/components/ui/toggle";

// import { supabase } from "../utils/supabase";
// import { revalidatePath } from "next/cache";

// const HawkerCard = async ({ hawker }) => {
//     // const [fav, setFav] = useState(false);

//     // const toggleFav = () => {
//     //     setFav(!fav);
//     //     console.log(hawker, fav);
//     // };

//     async function fav() {
//         "use server";

//         await supabase.from("favourites").select("*");
//         revalidatePath(`/hawkers`);
//         console.log("hello");
//     }

//     return (
//         <Card className="h-full flex flex-col justify-between">
//             <Link href={"/hawkers/" + hawker._id} key={hawker._id}>
//                 <div className="h-48 w-full relative">
//                     <Image
//                         src={hawker.photourl}
//                         alt="image"
//                         className="rounded-t-[8px] max-h-48 relative"
//                         style={{ objectFit: "cover" }}
//                         fill
//                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                 </div>
//                 <CardHeader>
//                     <CardTitle>{hawker.name}</CardTitle>
//                     <CardDescription>{hawker.address_myenv}</CardDescription>
//                 </CardHeader>
//             </Link>
//             <CardContent>
//                 <button formAction={fav}>{hawker._id}&nbsp;Like</button>

//                 {/* <button type="submit">Favourite</button> */}
//             </CardContent>
//         </Card>
//     );
// };

// export default HawkerCard;

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
import { supabase } from "../utils/supabase";

const HawkerCard = ({ hawker, userId }) => {
    const [isFav, setIsFav] = useState(false);
    // const [userSession, setUserSession] = useState(null);
    // const [userId, setUserId] = useState(null);

    // useEffect(() => {
    //     supabase.auth.onAuthStateChange((event, session) => {
    //         if (event === "SIGNED_IN") {
    //             // User is signed in
    //             setUserSession(session);
    //             setUserId(session.user.id);
    //             console.log(userId);
    //         } else if (event === "SIGNED_OUT") {
    //             // User is signed out
    //             setUserSession(null);
    //             setUserId(null);
    //         }
    //     });
    // }, []);
    // console.log(userId);

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
            // Check if the item is already favorited
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
                // Item is already favorited, so remove it from favorites
                await supabase
                    .from("favourites")
                    .delete()
                    .eq("user_id", userId)
                    .eq("hawker_id", hawker._id);
            } else {
                // Item is not favorited, so add it to favorites
                await supabase.from("favourites").insert([
                    {
                        user_id: userId,
                        hawker_id: hawker._id,
                    },
                ]);
                setIsFav(!isFav);
            }

            // Toggle the favorite state
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
                <button onClick={toggleFav}>
                    {isFav ? "Remove from Favorites" : "Add to Favorites"}
                </button>
            </CardContent>
        </Card>
    );
};

export default HawkerCard;
