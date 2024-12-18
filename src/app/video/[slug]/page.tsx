import { Button } from "@/components/ui/button";
import VideoDetails from "@/components/VideoDetails";
import { getVideoInfo, formatNumber } from "@/lib/utils";

import { ChevronLeft } from "lucide-react";

import React from "react";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const data = await getVideoInfo(params.slug);
  // console.log(data)
  if (!data || !data.info || !data.info.author.thumbnails)
    return <div>loading...</div>;

  return (
    <main className="p-8 flex flex-col gap-8">
      <div>
        <Button className="bg-zinc-900" variant={"secondary"}>
          <ChevronLeft size={24} />
          <span>Convert an other video</span>
        </Button>
      </div>
      <VideoDetails data={data} />
    </main>
  );
}
