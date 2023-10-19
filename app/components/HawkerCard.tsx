// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

// const HawkerCard = ({ hawker }) => {
//     const [fav, setFav] = useState(false);

//     return (
// <div className="rounded-xl h-full">
//     <div className="h-64">
//         <Image
//             src={hawker.photourl}
//             alt="image"
//             className="rounded-t-xl max-h-64 relative"
//             width={500}
//             height={500}
//         />
//     </div>
//             <div className="p-6">
//                 <p className="text-xl font-semibold">{hawker.name}</p>

//                 <div className="flex gap-2">
//                     <p className="text-sm mt-2">{hawker.address_myenv}</p>

//                     <button onClick={() => setFav(!fav)}>
//                         {fav ? (
//                             <IoMdHeart size={24} color="tomato" />
//                         ) : (
//                             <IoMdHeartEmpty size={24} color="tomato" />
//                         )}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HawkerCard;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";

const HawkerCard = ({ hawker }) => {
    return (
        <Card className="h-full flex flex-col justify-between">
            <Link href={"/hawkers/" + hawker._id} key={hawker._id}>
                <div className="h-48 w-full relative">
                    <Image
                        src={hawker.photourl}
                        alt="image"
                        className="rounded-t-xl max-h-48 relative"
                        objectFit="cover"
                        layout="fill"
                    />
                </div>
                <CardHeader>
                    <CardTitle>{hawker.name}</CardTitle>
                    <CardDescription>{hawker.address_myenv}</CardDescription>
                </CardHeader>
            </Link>
            <CardContent>
                <Toggle>Favorite</Toggle>
            </CardContent>
        </Card>
    );
};

export default HawkerCard;
