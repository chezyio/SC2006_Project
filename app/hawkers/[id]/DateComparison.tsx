"use client";
import React, { useState, useEffect } from "react";
import { CalendarRange } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DateRangeComparison({ dateRanges }) {
    const [daysLeft, setDaysLeft] = useState({});

    useEffect(() => {
        const currentDate = new Date();
        const daysLeftObject = {};

        JSON.parse(dateRanges).forEach((range) => {
            const start = new Date(range.start);
            const end = new Date(range.end);
            const timeDifference = start - currentDate;
            const daysDifference = Math.ceil(
                timeDifference / (1000 * 60 * 60 * 24)
            );

            if (daysDifference > 0) {
                daysLeftObject[range.name] = daysDifference;
            }
        });

        setDaysLeft(daysLeftObject);
    }, [dateRanges]);

    return (
        <div>
            <Alert>
                <CalendarRange className="h-4 w-4" />
                <AlertTitle>
                    {Object.keys(daysLeft).map((rangeName) => (
                        <p key={rangeName}>
                            {daysLeft[rangeName]} days left before next cleaning
                            day in {rangeName}
                        </p>
                    ))}
                    {Object.keys(daysLeft).length === 0 && (
                        <p>Please check back again for more updates!</p>
                    )}
                </AlertTitle>
            </Alert>
        </div>
    );
}
