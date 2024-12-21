"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileVideo, Music, Download } from "lucide-react";
import { formatFileSize, getCodecInfo, downloadVideo, downloadAudio } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface Format {
  mimeType: string;
  qualityLabel?: string;
  container: string;
  hasVideo: boolean;
  hasAudio: boolean;
  codecs: string[];
  contentLength: string;
  itag: string;
}

interface VideoFormatsProps {
  formats: {
    video: Format;
    audio: Format;
  };
  videoId: string;
}

export default function VideoFormats({ formats, videoId }: VideoFormatsProps) {
  const videoFormat = formats.video;
  const audioFormat = formats.audio;
  const [videoProgress, setVideoProgress] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isDownloadingVideo, setIsDownloadingVideo] = useState(false);
  const [isDownloadingAudio, setIsDownloadingAudio] = useState(false);

  const handleVideoDownload = async () => {
    try {
      setIsDownloadingVideo(true);
      await downloadVideo(videoId, videoFormat, (progress) => {
        setVideoProgress(progress);
      });
    } finally {
      setIsDownloadingVideo(false);
      setVideoProgress(0);
    }
  };

  const handleAudioDownload = async () => {
    try {
      setIsDownloadingAudio(true);
      await downloadAudio(videoId, audioFormat, (progress) => {
        setAudioProgress(progress);
      });
    } finally {
      setIsDownloadingAudio(false);
      setAudioProgress(0);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full lg:w-2/5">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Download Options</h3>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <FileVideo size={18} />
              Video Formats
            </h4>
            <div className="grid gap-2">
              {videoFormat && (
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={handleVideoDownload}
                    disabled={isDownloadingVideo}
                  >
                    <span className="flex items-center gap-2">
                      <FileVideo size={16} />
                      <div className="flex flex-row items-center justify-center gap-2">
                        <span className="text-left">
                          {videoFormat.qualityLabel || "Unknown"} -{" "}
                          {videoFormat.container}{" "}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {getCodecInfo(videoFormat)}
                        </span>

                        {videoFormat.contentLength && (
                          <span className="ml-2 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                            {formatFileSize(videoFormat.contentLength)}
                          </span>
                        )}
                      </div>
                    </span>
                    <Download size={16} />
                  </Button>
                  {isDownloadingVideo && (
                    <div className="space-y-1">
                      <Progress value={videoProgress} />
                      <p className="text-xs text-muted-foreground text-right">{videoProgress.toFixed(0)}%</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Music size={18} />
              Audio Formats
            </h4>
            <div className="grid gap-2">
              {!audioFormat && (
                <span className="text-muted-foreground">
                  No audio formats available
                </span>
              )}
              {audioFormat && (
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={handleAudioDownload}
                    disabled={isDownloadingAudio}
                  >
                    <span className="flex items-center gap-2">
                      <Music size={16} />
                      <span className="text-left">
                        Audio - {audioFormat.container}{" "}
                        <span className="text-xs text-muted-foreground">
                          {getCodecInfo(audioFormat)}
                        </span>
                        {audioFormat.contentLength && (
                          <span className="ml-2 text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                            {formatFileSize(audioFormat.contentLength)}
                          </span>
                        )}
                      </span>
                    </span>
                    <Download size={16} />
                  </Button>
                  {isDownloadingAudio && (
                    <div className="space-y-1">
                      <Progress value={audioProgress} />
                      <p className="text-xs text-muted-foreground text-right">{audioProgress.toFixed(0)}%</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
