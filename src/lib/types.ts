export interface Format {
  mimeType: string;
  qualityLabel?: string;
  container: string;
  hasVideo: boolean;
  hasAudio: boolean;
  codecs: string[] | string;
  contentLength: string;
  itag: string;
}

export interface DownloadProgress {
  percentage: number;
  downloaded: number;
  total: number;
} 