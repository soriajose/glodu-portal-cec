import { SpeakerDto, DownloadMaterialDto, RelatedContentDto, EventDetailDto } from '../dto/event.dto';

export interface Speaker {
  id: string;
  name: string;
  role: string;
  initials: string;
  colorClass: string;
}

export interface DownloadMaterial {
  id: string;
  title: string;
  fileType: string;
  fileSize: string;
}

export interface RelatedContent {
  id: string;
  title: string;
  snippet: string;
  imageUrl: string;
  slug: string;
}

export interface EventDetail {
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
  speakers: Speaker[];
  downloads: DownloadMaterial[];
  relatedContent: RelatedContent[];
}

export function mapSpeakerDtoToModel(dto: SpeakerDto): Speaker {
  return {
    id: dto.id,
    name: dto.name,
    role: dto.role,
    initials: dto.initials,
    colorClass: dto.colorClass || 'bg-[#2F4997] text-white'
  };
}

export function mapDownloadMaterialDtoToModel(dto: DownloadMaterialDto): DownloadMaterial {
  return {
    id: dto.id,
    title: dto.title,
    fileType: dto.fileType,
    fileSize: dto.fileSize
  };
}

export function mapRelatedContentDtoToModel(dto: RelatedContentDto): RelatedContent {
  return {
    id: dto.id,
    title: dto.title,
    snippet: dto.snippet,
    imageUrl: dto.imageUrl,
    slug: dto.slug
  };
}

export function mapEventDetailDtoToModel(dto: EventDetailDto): EventDetail {
  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title,
    date: dto.date,
    location: dto.location,
    badge: dto.badge,
    videoTitle: dto.videoTitle,
    videoUrl: dto.videoUrl,
    thumbnailUrl: dto.thumbnailUrl,
    details: dto.details,
    speakers: dto.speakers.map(mapSpeakerDtoToModel),
    downloads: dto.downloads.map(mapDownloadMaterialDtoToModel),
    relatedContent: dto.relatedContent.map(mapRelatedContentDtoToModel)
  };
}
