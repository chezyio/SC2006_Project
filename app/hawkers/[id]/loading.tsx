import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div>
            <Skeleton className="w-full h-96 rounded-[8px] my-4" />
            <Skeleton className="w-3/4 h-8 rounded-full" />
            <Skeleton className="w-1/2 h-8 rounded-full my-2" />
            <Skeleton className="w-full h-16 rounded-full" />

            <Skeleton className="w-full h-16 rounded--[8px] my-8" />

            <Skeleton className="w-full h-96 rounded--[8px]" />
        </div>
    );
}
