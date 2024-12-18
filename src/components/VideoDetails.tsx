import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
import { Check, ChevronLeft, ExternalLink } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export default async function VideoDetails({ data }: { data: any }) {
  return (
    <div className=" flex flex-col gap-4 xl:w-2/5 md:w-3/5">
      <div className="relative  rounded-2xl overflow-hidden">
        <img
          className="w-full  "
          src={data.info.thumbnails[data.info.thumbnails.length - 1].url}
          width={data.info.thumbnails[data.info.thumbnails.length - 1].width}
          height={data.info.thumbnails[data.info.thumbnails.length - 1].height}
          alt={data.info.title}
        />
        <span className="absolute bottom-2 right-2 bg-black/50 sm:py-2 sm:px-4 py-1 px-2 text-xs sm:text-base rounded-sm sm:rounded-xl">
          {Number(Number(data.info.lengthSeconds) / 60)
            .toFixed(2)
            .replace(".", ":")}
        </span>
      </div>

      <div className="flex sm:flex-row flex-col sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex flex-row gap-4 items-start">
          <div>
            <img
              className="w-16 h-16 rounded-full"
              src={
                data.info.author.thumbnails[
                  data.info.author.thumbnails.length - 1
                ].url
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold">{data.info.title}</h3>

            <div className="flex flex-col">
              <div className="flex flex-row gap-2 items-center">
                <span className="text-zinc-500">{data.info.author.name}</span>
                {data.info.author.verified && (
                  <Check className="text-zinc-500" size={16} />
                )}
              </div>
              <div>
                <div className="flex flex-row text-zinc-500">
                  {formatNumber(Number(data.info.viewCount))} views •{" "}
                  {dayjs(data.info.uploadDate).fromNow()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Button variant={"destructive"} className="sm:w-fit w-full">
            <Link
              href={data.info.video_url}
              target="_blank"
              className="flex items-center justify-center gap-2"
            >
              <span>Watch on YouTube</span>
              <ExternalLink />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
