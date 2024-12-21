import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function VideoDetailsSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex flex-col gap-4 xl:w-2/5 md:w-3/5">
        <div className="relative rounded-2xl overflow-hidden">
          <Skeleton className="w-full aspect-video" />
        </div>

        <div className="flex sm:flex-row flex-col sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div className="flex flex-row gap-4 items-start">
            <div>
              <Skeleton className="w-16 h-16 rounded-full" />
            </div>

            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-[250px]" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>

          <div>
            <Skeleton className="h-9 w-[150px]" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full md:w-2/5">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <Skeleton className="h-6 w-[200px] mb-4" />
          <div className="space-y-4">
            <div>
              <Skeleton className="h-4 w-[150px] mb-2" />
              <div className="space-y-2">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
            <div>
              <Skeleton className="h-4 w-[150px] mb-2" />
              <div className="space-y-2">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 