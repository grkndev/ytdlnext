import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ytdl from "ytdl-core";
import type { Format } from "./types";

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
  const params = new URLSearchParams({
    videoID: url,
    quality: 'highestvideo',
    filter: 'videoonly'
  }).toString();

  const audioParams = new URLSearchParams({
    videoID: url,
    quality: 'highestaudio',
    filter: 'audioonly'
  }).toString();

  const videoRes = await fetch(`http://localhost:3001/formats?${params}`);
  const audioRes = await fetch(`http://localhost:3001/formats?${audioParams}`);

  const audioFormats = await audioRes.json();
  const videoFormats = await videoRes.json();
  const formats = { video: videoFormats as Format, audio: audioFormats as Format };

  const info = await ytdl.getBasicInfo(url);
  return { formats, info: info.videoDetails };
}

export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(0) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString();
}

export function formatFileSize(bytes: string): string {
  const size = parseInt(bytes);
  if (!size) return "";

  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

export function getCodecInfo(format: { codecs: string[] | string }): string {
  if (!format.codecs) return "";
  if (Array.isArray(format.codecs)) {
    return `(${format.codecs.join(", ")})`;
  }
  return `(${String(format.codecs).split(".")[0]})`;
}

export async function downloadVideo(url: string, format: Format, onProgress?: (progress: number) => void) {
  try {
    const params = new URLSearchParams({
      videoID: url,
      quality: 'highestvideo',
      filter: 'videoonly',
      format: format.itag.toString()
    }).toString();

    const res = await fetch(`/api/download?${params}`);
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Download failed');
    }

    const contentLength = res.headers.get('x-content-length');
    const totalSize = contentLength ? parseInt(contentLength) : 0;
    const chunks: Uint8Array[] = [];
    let receivedLength = 0;

    const reader = res.body?.getReader();
    if (!reader) throw new Error('Failed to get reader');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);
      receivedLength += value.length;

      if (onProgress && totalSize) {
        const progress = (receivedLength / totalSize) * 100;
        onProgress(progress);
      }
    }

    const blob = new Blob(chunks);
    const urlBlob = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlBlob;
    a.download = `video.${format.container}`;
    a.click();
    URL.revokeObjectURL(urlBlob);
  } catch (error) {
    console.error('Video download error:', error);
    throw error;
  }
}

export async function downloadAudio(url: string, format: Format, onProgress?: (progress: number) => void) {
  try {
    const params = new URLSearchParams({
      videoID: url,
      quality: 'highestaudio',
      filter: 'audioonly',
      format: format.itag.toString()
    }).toString();

    const res = await fetch(`/api/download?${params}`);
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Download failed');
    }

    const contentLength = res.headers.get('x-content-length');
    const totalSize = contentLength ? parseInt(contentLength) : 0;
    const chunks: Uint8Array[] = [];
    let receivedLength = 0;

    const reader = res.body?.getReader();
    if (!reader) throw new Error('Failed to get reader');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);
      receivedLength += value.length;

      if (onProgress && totalSize) {
        const progress = (receivedLength / totalSize) * 100;
        onProgress(progress);
      }
    }

    const blob = new Blob(chunks);
    const urlBlob = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlBlob;
    a.download = `audio.${format.container}`;
    a.click();
    URL.revokeObjectURL(urlBlob);
  } catch (error) {
    console.error('Audio download error:', error);
    throw error;
  }
}
