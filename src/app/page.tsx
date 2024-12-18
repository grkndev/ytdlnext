"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkValidUrl, getVideoId } from "@/lib/utils";
import { useRouter } from "next/navigation";

import React from "react";
export default function Home() {
  const router = useRouter();
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  return (
    <main className="p-4 w-full items-center justify-center flex h-screen">
      <div className=" w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4 items-center justify-center">
        <h1 className="font-bold text-2xl">Youtube Video Converter</h1>
        <Input
          onChange={(e) => setUrl(e.target.value)}
          className={error ? "border border-red-500" : ""}
          placeholder="Enter youtube video url"
        />
        <Button
          onClick={() => {
            setLoading(true);
            checkValidUrl(url)
              ? router.push(`/video/${getVideoId(url)}`)
              : setError(true);
          }}
          className="w-full"
        >
          Convert
        </Button>
      </div>
    </main>
  );
}
