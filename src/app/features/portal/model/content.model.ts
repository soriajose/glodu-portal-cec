import { CategoryChipDto, FeaturedVideoDto, ResourceCardDto, PaidCourseDto, HeroDto } from '../dto/content.dto';

export interface Hero {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface CategoryChip {
  id: string;
  name: string;
  icon: string;
  active: boolean;
}

export interface FeaturedVideo {
  id: string;
  title: string;
  badge: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
}

export interface ResourceCard {
  id: string;
  title: string;
  subtitle: string;
  type: 'public' | 'manual' | 'archivo' | 'biblioteca' | 'notarios';
  imageUrl?: string;
  icon?: string;
  badge?: string;
}

export const VIRTUAL_CAMPUS_URL = 'https://virtualcec.glodu.tech/';

export interface ReelVideo {
  id: string;
  title: string;
  author: string;
  date: string;
  year: string;
  category: string;
  duration: string;
  thumbnailUrl: string;
  reelPreviewVideoUrl?: string;
  fullYoutubeUrl: string;
  description: string;
  views?: string;
}

export interface VideoFilterState {
  author: string;
  year: string;
  category: string;
  searchQuery: string;
}

export interface PaidCourse {
  id: string;
  tag: string;
  badgeNew: boolean;
  badgeText?: string;
  price: string;
  memberPrice?: string;
  instructor?: string;
  rating?: string;
  studentsCount?: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  modalities: string;
}

export interface SidanoPill {
  id: string;
  title: string;
  category: string;
  speaker: string;
  date: string;
  year: string;
  duration: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  summary: string;
}

export interface TechSkillCourse {
  id: string;
  title: string;
  instructor: string;
  date: string;
  duration: string;
  modality: string;
  spotsAvailable: number;
  description: string;
  imageUrl: string;
  tag: string;
  active: boolean;
}

export interface SearchFilterState {
  query: string;
  category: string | null;
}

export function mapCategoryChipDtoToModel(dto: CategoryChipDto): CategoryChip {
  return {
    id: dto.id,
    name: dto.name,
    icon: dto.icon,
    active: !!dto.active
  };
}

export function mapHeroDtoToModel(dto: HeroDto): Hero {
  return {
    title: dto.title,
    subtitle: dto.subtitle,
    imageUrl: dto.imageUrl
  };
}

export function mapFeaturedVideoDtoToModel(dto: FeaturedVideoDto): FeaturedVideo {
  return {
    id: dto.id,
    title: dto.title,
    badge: dto.badge || 'DESTACADO',
    description: dto.description,
    imageUrl: dto.imageUrl,
    videoUrl: dto.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  };
}

export function mapResourceCardDtoToModel(dto: ResourceCardDto): ResourceCard {
  return {
    id: dto.id,
    title: dto.title,
    subtitle: dto.subtitle,
    type: dto.type,
    imageUrl: dto.imageUrl,
    icon: dto.icon,
    badge: dto.badge
  };
}

export function mapPaidCourseDtoToModel(dto: PaidCourseDto): PaidCourse {
  return {
    id: dto.id,
    tag: dto.tag,
    badgeNew: !!dto.badgeNew,
    price: dto.price,
    title: dto.title,
    description: dto.description,
    imageUrl: dto.imageUrl,
    duration: dto.duration || '6 Meses',
    modalities: dto.modalities || 'Online Sincrónico / Asincrónico'
  };
}
