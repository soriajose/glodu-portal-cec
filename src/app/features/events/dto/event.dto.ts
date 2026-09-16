export interface SpeakerDto {
  id: string;
  name: string;
  role: string;
  initials: string;
  colorClass?: string;
}

export interface DownloadMaterialDto {
  id: string;
  title: string;
  fileType: string;
  fileSize: string;
}

export interface RelatedContentDto {
  id: string;
  title: string;
  snippet: string;
  imageUrl: string;
  slug: string;
}

export interface EventDetailDto {
  id: string;
  slug: string;
  title: string;
  date: string;
  location: string;
  badge: string;
  videoTitle: string;
  videoUrl: string;
  thumbnailUrl: string;
  details: string[];
  speakers: SpeakerDto[];
  downloads: DownloadMaterialDto[];
  relatedContent: RelatedContentDto[];
}
