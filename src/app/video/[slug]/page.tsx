import { Button } from "@/components/ui/button";
import VideoDetails from "@/components/VideoDetails";
import VideoDetailsSkeleton from "@/components/VideoDetailsSkeleton";
import VideoFormats from "@/components/VideoFormats";
import { getVideoInfo } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

async function VideoDetailsWrapper({ slug }: { slug: string }) {
  const data = await getVideoInfo(slug);
  if (!data || !data.info || !data.info.author.thumbnails)
    return <div>Video not found</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <VideoDetails data={data} />
      <VideoFormats videoId={data.info.videoId} formats={data.formats} />
    </div>
  );
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  return (
    <main className="p-8 flex flex-col gap-8">
      <div>
        <Button asChild className="bg-zinc-900" variant={"secondary"}>
          <Link href="/" className="flex items-center">
            <ChevronLeft size={24} />
            <span>Convert an other video</span>
          </Link>
        </Button>
      </div>
      <Suspense fallback={<VideoDetailsSkeleton />}>
        <VideoDetailsWrapper slug={params.slug} />
      </Suspense>
    </main>
  );
}
