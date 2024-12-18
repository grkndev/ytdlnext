import { getVideoInfo } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getVideoInfo(params.slug);

  return (
    <main>
      <img
      className="w-1/3"
        src={data.info.thumbnails[data.info.thumbnails.length - 1].url}
        width={data.info.thumbnails[data.info.thumbnails.length - 1].width}
        height={data.info.thumbnails[data.info.thumbnails.length - 1].height}
        alt={data.info.title}
      />
      <h1>{data.info.title}</h1>
    </main>
  );
}
