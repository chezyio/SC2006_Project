"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

const HawkerCard = ({ hawker }) => {
    const [fav, setFav] = useState(false);

    return (
        <div className="rounded-xl h-full">
            <div className="h-64">
                <Image
                    src={hawker.photourl}
                    alt="image"
                    className="rounded-t-xl max-h-64 relative"
                    width={500}
                    height={500}
                />
            </div>
            <div className="p-6">
                <p className="text-xl font-semibold">{hawker.name}</p>

                <div className="flex gap-2">
                    <p className="text-sm mt-2">{hawker.address_myenv}</p>

                    <button onClick={() => setFav(!fav)}>
                        {fav ? (
                            <IoMdHeart size={24} color="tomato" />
                        ) : (
                            <IoMdHeartEmpty size={24} color="tomato" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HawkerCard;
