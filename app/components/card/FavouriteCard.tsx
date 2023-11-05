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
import { Star } from "lucide-react";

const FavouriteCard = ({ favourite }) => {
    return (
        <Card className="h-full flex flex-col">
            <div className="h-48 w-full relative">
                <Image
                    src={favourite.hawker.photourl}
                    alt="image"
                    className="rounded-t-[8px] max-h-48 relative"
                    style={{ objectFit: "cover" }}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <CardHeader>
                <CardTitle>{favourite.hawker.name}</CardTitle>
                <CardDescription>
                    {favourite.hawker.address_myenv}
                </CardDescription>
            </CardHeader>
        </Card>
    );
};

export default FavouriteCard;
