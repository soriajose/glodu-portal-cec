export interface CategoryChipDto {
  id: string;
  name: string;
  icon: string;
  active?: boolean;
}

export interface HeroDto {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface FeaturedVideoDto {
  id: string;
  title: string;
  badge: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
}

export interface ResourceCardDto {
  id: string;
  title: string;
  subtitle: string;
  type: 'public' | 'manual' | 'archivo' | 'biblioteca' | 'notarios';
  imageUrl?: string;
  icon?: string;
  badge?: string;
}

export interface PaidCourseDto {
  id: string;
  tag: string;
  badgeNew?: boolean;
  price: string;
  title: string;
  description: string;
  imageUrl: string;
  duration?: string;
  modalities?: string;
}

export interface PortalApiResponseDto {
  hero: HeroDto;
  categories: CategoryChipDto[];
  featuredVideo: FeaturedVideoDto;
  resources: ResourceCardDto[];
  paidCourses: PaidCourseDto[];
}
