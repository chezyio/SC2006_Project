import Image from "next/image";
import { CalendarDays, Store, Star } from "lucide-react";
import HawkerMap from "../HawkerMap";
import { getHawkersById } from "@/app/utils/hawkers";
import { converter } from "@/app/utils/converter";
import { getReviews } from "@/app/utils/reviews";
import { summarizer } from "@/app/utils/summarizer";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

import DateRangeComparison from "./DateComparison";
const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
const page = async ({ params: { id } }: { params: { id: string } }) => {
    const result = await getHawkersById(id);
    const reviews = await getReviews(result.name);

    const textArray = reviews.reviews.map((review) => review.text);
    const allTexts = textArray.join("\n");

    const summarized = await summarizer(allTexts);

    const q1d = converter(result.q1_cleaningstartdate);
    const q2d = converter(result.q2_cleaningstartdate);
    const q3d = converter(result.q3_cleaningstartdate);
    const q4d = converter(result.q4_cleaningstartdate);

    const dateRanges = [
        {
            name: "Q1",
            start: q1d,
            end: result.q1_cleaningenddate,
        },
        {
            name: "Q2",
            start: q2d,
            end: result.q2_cleaningenddate,
        },
        {
            name: "Q3",
            start: q3d,
            end: result.q3_cleaningenddate,
        },
        {
            name: "Q4",
            start: q4d,
            end: result.q4_cleaningenddate,
        },
    ];
    return (
        <div className="">
            <div className="h-96 w-full relative my-4">
                <Image
                    src={result.photourl}
                    alt="image"
                    style={{ objectFit: "cover" }}
                    className="rounded-[8px]"
                    fill
                />
            </div>

            <p className="text-4xl font-bold">{result.name}</p>
            <p className="text-base my-2 text-neutral-500">
                {result.address_myenv}
            </p>
            <p className="text-xl my-8">{result.description_myenv}</p>

            <DateRangeComparison dateRanges={JSON.stringify(dateRanges)} />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-12">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold">
                            Q1 Cleaning Date
                        </CardTitle>
                        <CalendarDays />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-semibold">
                            <Label className="text-neutral-500">
                                Start Date
                            </Label>
                            <br />
                            {result.q1_cleaningstartdate}
                            <Separator className="my-2" />
                            <Label className="text-neutral-500">End Date</Label>
                            <br />
                            {result.q1_cleaningenddate}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold">
                            Q2 Cleaning Date
                        </CardTitle>
                        <CalendarDays />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-semibold">
                            <Label className="text-neutral-500">
                                Start Date
                            </Label>
                            <br />
                            {result.q2_cleaningstartdate}
                            <Separator className="my-2" />
                            <Label className="text-neutral-500">End Date</Label>
                            <br />
                            {result.q2_cleaningenddate}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold">
                            Q3 Cleaning Date
                        </CardTitle>
                        <CalendarDays />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-semibold">
                            <Label className="text-neutral-500">
                                Start Date
                            </Label>
                            <br />
                            {result.q3_cleaningstartdate}
                            <Separator className="my-2" />
                            <Label className="text-neutral-500">End Date</Label>
                            <br />
                            {result.q3_cleaningenddate}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold">
                            Q4 Cleaning Date
                        </CardTitle>
                        <CalendarDays />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-semibold">
                            <Label className="text-neutral-500">
                                Start Date
                            </Label>
                            <br />
                            {result.q4_cleaningstartdate}
                            <Separator className="my-2" />
                            <Label className="text-neutral-500">End Date</Label>
                            <br />
                            {result.q4_cleaningenddate}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold">
                            Number of Food Stores
                        </CardTitle>
                        <Store />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-semibold">
                            {result.no_of_food_stalls}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold">
                            Number of Market Stores
                        </CardTitle>
                        <Store />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-semibold">
                            {result.no_of_market_stalls}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-bold">
                            Opening Hours
                        </CardTitle>
                        <Store />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-semibold">
                            {reviews.opening_hours?.weekday_text ? (
                                reviews.opening_hours.weekday_text.map(
                                    (day, key) => {
                                        return (
                                            <div key={key}>
                                                <Label className="text-neutral-500">
                                                    {day}
                                                </Label>
                                                <br />
                                            </div>
                                        );
                                    }
                                )
                            ) : (
                                <div>null</div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div>
                <p>{summarized[0].text}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 my-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 col-span-2">
                    {reviews.photoUrls
                        ? reviews.photoUrls.map((photo, key) => {
                              return (
                                  <div
                                      key={key}
                                      className="h-full w-full relative"
                                  >
                                      <Image
                                          src={photo}
                                          alt="image"
                                          className="rounded-[8px] relative"
                                          style={{ objectFit: "cover" }}
                                          fill
                                      />
                                  </div>
                              );
                          })
                        : null}
                </div>

                <div className="grid gap-4 ">
                    {reviews.reviews.map((review, key) => {
                        return (
                            <Card key={key}>
                                <CardHeader className="flex flex-row justify-between">
                                    <div>
                                        <Image
                                            src={review.profile_photo_url}
                                            height={32}
                                            width={32}
                                        />
                                        <p className="text-lg font-medium">
                                            {review.author_name}
                                        </p>
                                        <CardDescription>
                                            {review.relative_time_description}
                                        </CardDescription>
                                    </div>
                                    <div className="flex gap-1">
                                        <CardTitle>{review.rating}</CardTitle>
                                        <Star />
                                    </div>
                                </CardHeader>
                                <CardContent>{review.text}</CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            <HawkerMap result={result} />
            {/* <ScrollArea className="h-72 rounded-md border">
                <div className="p-4">
                    <h4 className="mb-4 text-sm font-medium leading-none">
                        Tags
                    </h4>
                    {reviews.map((review, key) => (
                        <>
                            <Card key={key}>
                                <CardHeader className="flex flex-row justify-between">
                                    <div>
                                        <Image
                                            src={review.profile_photo_url}
                                            height={32}
                                            width={32}
                                        />
                                        <p className="text-lg font-medium">
                                            {review.author_name}
                                        </p>
                                        <CardDescription>
                                            {review.relative_time_description}
                                        </CardDescription>
                                    </div>
                                    <CardTitle>{review.rating} / 5</CardTitle>
                                </CardHeader>
                                <CardContent>{review.text}</CardContent>
                            </Card>
                            <Separator className="my-2" />
                        </>
                    ))}
                </div>
            </ScrollArea> */}
        </div>
    );
};

export default page;
