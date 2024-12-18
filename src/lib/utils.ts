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

export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(0) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toString();
}
