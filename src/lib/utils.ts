import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ytdl from "ytdl-core";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkValidUrl(url: string) {
  return ytdl.validateURL(url);
}
export function getVideoId(url: string) {
  return ytdl.getURLVideoID(url);
}
export async function getVideoInfo(url: string) {
  const formatRes = await fetch(
    `http://localhost:3001/formats?videoID=${url}&quality=highestvideo&filter=videoonly`
  );
  const formats = await formatRes.json();

  const info = await ytdl.getBasicInfo(url);
  return {formats, info: info.videoDetails};
}
