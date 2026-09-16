import { Injectable, signal, computed } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  CategoryChip,
  FeaturedVideo,
  ResourceCard,
  PaidCourse,
  Hero,
  ReelVideo,
  VideoFilterState,
  SidanoPill,
  TechSkillCourse,
  VIRTUAL_CAMPUS_URL,
  mapCategoryChipDtoToModel,
  mapFeaturedVideoDtoToModel,
  mapResourceCardDtoToModel,
  mapPaidCourseDtoToModel,
  mapHeroDtoToModel
} from '../model/content.model';
import { PortalApiResponseDto } from '../dto/content.dto';

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  readonly virtualCampusUrl = signal<string>(VIRTUAL_CAMPUS_URL);

  // Signals for state
  searchQuery = signal<string>('');
  selectedCategory = signal<string | null>(null);

  // Formación Continua - Reels & Videos State
  selectedReel = signal<ReelVideo | null>(null);
  filterVideoAuthor = signal<string>('todos');
  filterVideoYear = signal<string>('todos');
  filterVideoCategory = signal<string>('todos');
  videoCatalogSearch = signal<string>('');

  private reelsData = signal<ReelVideo[]>([
    {
      id: 'regimen-patrimonial-matrimonio',
      title: 'Régimen Patrimonial del Matrimonio y Uniones Convivenciales',
      author: 'Esc. María Teresa Rossi',
      date: '15 Mar 2026',
      year: '2026',
      category: 'Familia y Sucesiones',
      duration: '42 min',
      thumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop',
      fullYoutubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Análisis pormenorizado de las convenciones matrimoniales, calificación de bienes y liquidación del régimen de comunidad con jurisprudencia de los tribunales cordobeses.',
      views: '1.4k vistas'
    },
    {
      id: 'tokenizacion-activos-inmobiliarios',
      title: 'Tokenización de Activos Inmobiliarios y Seguridad Jurídica',
      author: 'Dr. Santiago Falcone',
      date: '28 Feb 2026',
      year: '2026',
      category: 'Nuevas Tecnologías',
      duration: '38 min',
      thumbnailUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop',
      fullYoutubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'El rol imprescindible del notario como custodio de la legalidad en contratos inteligentes y fraccionamiento fiduciario digital.',
      views: '2.8k vistas'
    },
    {
      id: 'actas-notariales-digitales',
      title: 'Actas Notariales de Constatación en Medios Digitales',
      author: 'Esc. Javier E. Menéndez',
      date: '10 Feb 2026',
      year: '2026',
      category: 'Práctica Notarial',
      duration: '45 min',
      thumbnailUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800&auto=format&fit=crop',
      fullYoutubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Protocolos técnicos para la fijación de pruebas digitales, mensajes de mensajería instantánea, páginas web y redes sociales.',
      views: '3.1k vistas'
    },
    {
      id: 'fideicomisos-inmobiliarios-aspectos',
      title: 'Fideicomisos Inmobiliarios: Aspectos Registrales y Notariales',
      author: 'Dra. Lucía Bustos Fierro',
      date: '18 Nov 2025',
      year: '2025',
      category: 'Derecho Inmobiliario',
      duration: '50 min',
      thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
      fullYoutubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Transmisión fiduciaria, extinción y adjudicación de unidades terminadas ante el Registro General de la Provincia.',
      views: '950 vistas'
    },
    {
      id: 'planificacion-sucesoria-empresas',
      title: 'Planificación Sucesoria y Transmisión de Empresas Familiares',
      author: 'Esc. Roberto C. Garzón',
      date: '04 Oct 2025',
      year: '2025',
      category: 'Derecho Societario',
      duration: '55 min',
      thumbnailUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop',
      fullYoutubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Protocolos familiares, pactos de herencia futura autorizados por el CCCN y donaciones con reserva de usufructo.',
      views: '1.2k vistas'
    },
    {
      id: 'firma-digital-matriz-digital',
      title: 'Firma Digital y Matriz Notarial Electrónica en Córdoba',
      author: 'Ing. Marcos Dellatorre & Esc. Sofía Paz',
      date: '12 Sep 2025',
      year: '2025',
      category: 'Nuevas Tecnologías',
      duration: '35 min',
      thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
      fullYoutubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Implementación del folio digital, validación con token criptográfico y preservación documental en soporte electrónico.',
      views: '2.1k vistas'
    },
    {
      id: 'uif-lavado-activos-notario',
      title: 'El Rol del Notario en la Prevención del Lavado de Activos (UIF)',
      author: 'Dr. Guillermo Álvarez',
      date: '20 Jun 2025',
      year: '2025',
      category: 'Normativa y Cumplimiento',
      duration: '48 min',
      thumbnailUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
      fullYoutubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Nuevas resoluciones de la Unidad de Información Financiera, matrices de riesgo y debida diligencia de clientes en escrituración.',
      views: '1.8k vistas'
    },
    {
      id: 'prescripcion-adquisitiva-titulos',
      title: 'Prescripción Adquisitiva y Subsanación de Títulos Notariales',
      author: 'Esc. Marcela D’Angelo',
      date: '15 May 2025',
      year: '2025',
      category: 'Derecho Registral',
      duration: '40 min',
      thumbnailUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop',
      fullYoutubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Trámite notarial preparatorio, antecedentes dominiales y coordinación con la Dirección General de Catastro.',
      views: '890 vistas'
    },
    {
      id: 'poderes-irrevocables-post-mortem',
      title: 'Poderes Irrevocables y Mandatos Especiales Post Mortem',
      author: 'Esc. Daniel Altamirano',
      date: '14 Nov 2024',
      year: '2024',
      category: 'Práctica Notarial',
      duration: '36 min',
      thumbnailUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800&auto=format&fit=crop',
      fullYoutubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Límites, validez temporal y eficacia frente a terceros herederos forzosos según la doctrina civil contemporánea.',
      views: '1.6k vistas'
    },
    {
      id: 'proteccion-vivienda-bien-familia',
      title: 'Afectación al Régimen de Protección de la Vivienda',
      author: 'Dra. Carolina Moroni',
      date: '22 Ago 2024',
      year: '2024',
      category: 'Derecho Inmobiliario',
      duration: '34 min',
      thumbnailUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop',
      fullYoutubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Requisitos sustanciales, subrogación de la vivienda familiar y desafectaciones unilaterales o conjuntas.',
      views: '2.4k vistas'
    }
  ]);

  private heroData = signal<Hero>({
    title: 'Portal de Capacitación y Contenido Institucional',
    subtitle: 'Accedé a la excelencia profesional a través de nuestra biblioteca digital y cursos especializados para el notariado cordobés.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop'
  });

  private categoriesData = signal<CategoryChip[]>([
    { id: 'conferencias', name: 'Conferencias', icon: 'mic', active: false },
    { id: 'actualidad', name: 'Actualidad Profesional', icon: 'newspaper', active: false },
    { id: 'gratuitas', name: 'Capacitaciones Gratuitas', icon: 'volunteer_activism', active: false },
    { id: 'novedades', name: 'Novedades', icon: 'campaign', active: false }
  ]);

  private featuredVideoData = signal<FeaturedVideo>({
    id: '22-jornada-notarial-cordobesa',
    title: '22° Jornada Notarial Cordobesa',
    badge: 'DESTACADO',
    description: 'Un espacio de conocimiento, debate y visión de futuro para la función notarial. Reviví las conferencias magistrales y los paneles de discusión más importantes de este año.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  });

  private resourcesData = signal<ResourceCard[]>([
    {
      id: 'publico-general',
      title: 'Público en general',
      subtitle: 'Guías informativas para trámites y servicios ciudadanos.',
      type: 'public',
      imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'manual-etica',
      title: 'Manual de Ética',
      subtitle: 'Principios y valores del ejercicio notarial.',
      type: 'manual',
      icon: 'gavel'
    },
    {
      id: 'archivo-protocolos',
      title: 'Archivo de Protocolos',
      subtitle: 'Acceso digital a registros históricos y actas.',
      type: 'archivo',
      imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'biblioteca-notarial',
      title: 'Biblioteca Notarial',
      subtitle: 'El repositorio jurídico más completo de la provincia de Córdoba a su disposición.',
      type: 'biblioteca',
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'listado-notarios',
      title: 'Listado de Notarios',
      subtitle: 'Búsqueda por nombre o zona.',
      type: 'notarios',
      icon: 'list_alt'
    }
  ]);

  private paidCoursesData = signal<PaidCourse[]>([
    {
      id: 'diplomatura-derecho-digital-ia',
      tag: 'DIPLOMATURA',
      badgeNew: true,
      badgeText: 'EN TENDENCIA',
      price: '$145.000',
      memberPrice: '$95.000 para Colegiados',
      instructor: 'Dr. Santiago Falcone & Prof. Invitados',
      rating: '4.9 ★',
      studentsCount: '128 inscriptos',
      title: 'Diplomatura en Derecho Digital, Inteligencia Artificial y Activos Virtuales',
      description: 'Herramientas esenciales para el notario en la era de los contratos inteligentes, tokenización inmobiliaria e inteligencia artificial.',
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop',
      duration: '4 Meses (120 Horas Cátedra)',
      modalities: 'Modalidad Híbrida (Streaming + Campus)'
    },
    {
      id: 'posgrado-actualizacion-notarial',
      tag: 'POSGRADO',
      badgeNew: false,
      badgeText: 'MÁS POPULAR',
      price: '$190.000',
      memberPrice: '$130.000 para Colegiados',
      instructor: 'Esc. María Teresa Rossi',
      rating: '4.8 ★',
      studentsCount: '210 inscriptos',
      title: 'Posgrado de Especialización en Derecho Notarial y Registral Inmobiliario',
      description: 'Actualización profunda sobre normativa provincial y nacional con juristas del Colegio y la Academia Nacional del Notariado.',
      imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800&auto=format&fit=crop',
      duration: '8 Meses (240 Horas Cátedra)',
      modalities: '100% Online Asincrónico'
    },
    {
      id: 'taller-practico-fideicomisos',
      tag: 'TALLER PRÁCTICO',
      badgeNew: true,
      badgeText: 'NUEVO',
      price: '$65.000',
      memberPrice: '$45.000 para Colegiados',
      instructor: 'Dra. Lucía Bustos Fierro',
      rating: '4.9 ★',
      studentsCount: '85 inscriptos',
      title: 'Taller Práctico: Instrumentación Notarial de Fideicomisos y Loteos',
      description: 'Redacción de cláusulas críticas, adjudicación fiduciaria y tramitaciones ante el Registro General de la Provincia.',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
      duration: '6 Semanas (45 Horas Cátedra)',
      modalities: 'Encuentros Sincrónicos vía Campus'
    },
    {
      id: 'especializacion-planificacion-patrimonial',
      tag: 'ESPECIALIZACIÓN',
      badgeNew: false,
      badgeText: 'DESTACADO',
      price: '$110.000',
      memberPrice: '$75.000 para Colegiados',
      instructor: 'Esc. Roberto C. Garzón',
      rating: '4.7 ★',
      studentsCount: '94 inscriptos',
      title: 'Especialización en Planificación Patrimonial Familiar y Sucesoria',
      description: 'Protocolos de empresa familiar, donaciones, fideicomisos testamentarios y pactos sobre herencia futura.',
      imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop',
      duration: '3 Meses (90 Horas Cátedra)',
      modalities: 'Streaming en Vivo + Grabaciones'
    }
  ]);

  // Pastillas de SIDANO State
  private sidanoPillsData = signal<SidanoPill[]>([
    {
      id: 'sidano-01-firma-digital',
      title: 'Firma Digital y Validez Probatoria en Actas de Constatación Web',
      category: 'Nuevas Tecnologías',
      speaker: 'Ing. Marcos Dellatorre & Comisión TIC',
      date: '10 Feb 2026',
      year: '2026',
      duration: '4 min',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
      summary: 'Pautas técnicas imprescindibles para la fijación de pruebas informáticas en redes sociales y sitios web.'
    },
    {
      id: 'sidano-02-asentimiento-conyugal',
      title: 'Asentimiento Conyugal y Disposición de Derechos Hereditarios',
      category: 'Familia y Sucesiones',
      speaker: 'Esc. Javier E. Menéndez',
      date: '22 Ene 2026',
      year: '2026',
      duration: '5 min',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop',
      summary: 'Criterio doctrinario unificado de la Comisión de Consultas sobre el artículo 456 del CCCN.'
    },
    {
      id: 'sidano-03-planos-propiedad-horizontal',
      title: 'Validación Registral de Planos de Subdivisión en Propiedad Horizontal',
      category: 'Derecho Inmobiliario',
      speaker: 'Dra. Carolina Moroni',
      date: '15 Nov 2025',
      year: '2025',
      duration: '3 min',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop',
      summary: 'Checklist previo antes de la protocolización e inscripción del reglamento de copropiedad.'
    },
    {
      id: 'sidano-04-uif-reportes',
      title: 'Reportes Sistemáticos y Matriz de Riesgo ante la UIF',
      category: 'Normativa y Cumplimiento',
      speaker: 'Dr. Guillermo Álvarez',
      date: '05 Oct 2025',
      year: '2025',
      duration: '6 min',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
      summary: 'Nuevos umbrales económicos y verificación de beneficiario final en transferencias dominiales.'
    }
  ]);

  // Desarrolla tus Nuevas Habilidades (Comisión de Tecnología)
  private techSkillsData = signal<TechSkillCourse[]>([
    {
      id: 'taller-ia-redaccion-notarial',
      title: 'Inteligencia Artificial Generativa aplicada a la Redacción Notarial',
      instructor: 'Lic. Marcos Dellatorre (Comisión de Tecnología)',
      date: 'Inicio: 15 de Abril 2026',
      duration: '4 Encuentros (16 Horas)',
      modality: '100% Online vía Campus',
      spotsAvailable: 25,
      description: 'Prompts avanzados, análisis automatizado de títulos antecedentes y resguardo de confidencialidad en entornos LLM seguros.',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
      tag: 'TALLER TECNOLÓGICO',
      active: true
    },
    {
      id: 'workshop-tokenizacion-smartcontracts',
      title: 'Tokenización Inmobiliaria y Contratos Inteligentes para Escribanos',
      instructor: 'Dr. Santiago Falcone',
      date: 'Inicio: 28 de Abril 2026',
      duration: '2 Encuentros Intensivos',
      modality: 'Híbrida (Presencial Sede Central + Streaming)',
      spotsAvailable: 30,
      description: 'Fundamentos de Blockchain, estructuras fiduciarias digitales y marco regulatorio nacional.',
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop',
      tag: 'CHARLA TÉCNICA',
      active: true
    }
  ]);

  // Readonly signals getters
  hero = this.heroData.asReadonly();
  categories = this.categoriesData.asReadonly();
  featuredVideo = this.featuredVideoData.asReadonly();
  resources = this.resourcesData.asReadonly();
  paidCourses = this.paidCoursesData.asReadonly();
  reels = this.reelsData.asReadonly();
  sidanoPills = this.sidanoPillsData.asReadonly();
  techSkills = this.techSkillsData.asReadonly();

  // Getters by ID (slug)
  getCourseById(id: string): PaidCourse | undefined {
    return this.paidCoursesData().find(c => c.id === id);
  }

  getTechSkillById(id: string): TechSkillCourse | undefined {
    return this.techSkillsData().find(c => c.id === id);
  }

  getReelById(id: string): ReelVideo | undefined {
    return this.reelsData().find(r => r.id === id);
  }

  getSidanoPillById(id: string): SidanoPill | undefined {
    return this.sidanoPillsData().find(p => p.id === id);
  }

  // Condition to show or hide the Tech Skills section in Home
  hasActiveTechCourses = computed(() => this.techSkillsData().some(course => course.active));

  // Tech Skills Filters & Computed
  techSkillSearchQuery = signal<string>('');
  filterTechSkillTag = signal<string>('todos');

  availableTechSkillTags = computed(() => {
    const tags = new Set(this.techSkillsData().map(c => c.tag));
    return Array.from(tags).sort();
  });

  filteredTechSkills = computed(() => {
    const query = this.techSkillSearchQuery().toLowerCase().trim();
    const tag = this.filterTechSkillTag();

    return this.techSkillsData().filter(course => {
      const matchQuery = !query ||
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query);

      const matchTag = tag === 'todos' || course.tag === tag;

      return matchQuery && matchTag;
    });
  });

  setTechSkillSearchQuery(q: string): void {
    this.techSkillSearchQuery.set(q);
  }

  setTechSkillTagFilter(tag: string): void {
    this.filterTechSkillTag.set(tag);
  }

  resetTechSkillFilters(): void {
    this.techSkillSearchQuery.set('');
    this.filterTechSkillTag.set('todos');
  }

  // Sidano Filters & Computed
  filterSidanoCategory = signal<string>('todos');
  filterSidanoYear = signal<string>('todos');
  sidanoSearchQuery = signal<string>('');

  availableSidanoCategories = computed(() => {
    const cats = new Set(this.sidanoPillsData().map(p => p.category));
    return Array.from(cats).sort();
  });

  availableSidanoYears = computed(() => {
    const years = new Set(this.sidanoPillsData().map(p => p.year));
    return Array.from(years).sort().reverse();
  });

  filteredSidanoPills = computed(() => {
    const query = this.sidanoSearchQuery().toLowerCase().trim();
    const cat = this.filterSidanoCategory();
    const year = this.filterSidanoYear();

    return this.sidanoPillsData().filter(pill => {
      const matchQuery = !query ||
        pill.title.toLowerCase().includes(query) ||
        pill.speaker.toLowerCase().includes(query) ||
        pill.summary.toLowerCase().includes(query);

      const matchCat = cat === 'todos' || pill.category === cat;
      const matchYear = year === 'todos' || pill.year === year;

      return matchQuery && matchCat && matchYear;
    });
  });

  setSidanoCategoryFilter(cat: string): void {
    this.filterSidanoCategory.set(cat);
  }

  setSidanoYearFilter(year: string): void {
    this.filterSidanoYear.set(year);
  }

  setSidanoSearchQuery(q: string): void {
    this.sidanoSearchQuery.set(q);
  }

  resetSidanoFilters(): void {
    this.filterSidanoCategory.set('todos');
    this.filterSidanoYear.set('todos');
    this.sidanoSearchQuery.set('');
  }

  // Computed options for video filters
  availableVideoAuthors = computed(() => {
    const authors = new Set(this.reelsData().map(v => v.author));
    return Array.from(authors).sort();
  });

  availableVideoYears = computed(() => {
    const years = new Set(this.reelsData().map(v => v.year));
    return Array.from(years).sort().reverse();
  });

  availableVideoCategories = computed(() => {
    const cats = new Set(this.reelsData().map(v => v.category));
    return Array.from(cats).sort();
  });

  // Filtered videos for the Formación Continua catalog page
  filteredVideos = computed(() => {
    const query = this.videoCatalogSearch().toLowerCase().trim();
    const author = this.filterVideoAuthor();
    const year = this.filterVideoYear();
    const category = this.filterVideoCategory();

    return this.reelsData().filter(video => {
      const matchQuery = !query ||
        video.title.toLowerCase().includes(query) ||
        video.author.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query);

      const matchAuthor = author === 'todos' || video.author === author;
      const matchYear = year === 'todos' || video.year === year;
      const matchCategory = category === 'todos' || video.category === category;

      return matchQuery && matchAuthor && matchYear && matchCategory;
    });
  });

  // Filtered courses based on search query or category
  filteredCourses = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const courses = this.paidCoursesData();

    if (!query) return courses;

    return courses.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.tag.toLowerCase().includes(query)
    );
  });

  // Action methods for reels & videos
  selectReel(reel: ReelVideo | null): void {
    this.selectedReel.set(reel);
  }

  setVideoAuthorFilter(author: string): void {
    this.filterVideoAuthor.set(author);
  }

  setVideoYearFilter(year: string): void {
    this.filterVideoYear.set(year);
  }

  setVideoCategoryFilter(category: string): void {
    this.filterVideoCategory.set(category);
  }

  setVideoCatalogSearch(query: string): void {
    this.videoCatalogSearch.set(query);
  }

  resetVideoFilters(): void {
    this.filterVideoAuthor.set('todos');
    this.filterVideoYear.set('todos');
    this.filterVideoCategory.set('todos');
    this.videoCatalogSearch.set('');
  }

  // Action methods
  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  toggleCategory(categoryId: string): void {
    this.categoriesData.update(cats =>
      cats.map(cat => ({
        ...cat,
        active: cat.id === categoryId ? !cat.active : false
      }))
    );

    const activeCat = this.categoriesData().find(c => c.active);
    this.selectedCategory.set(activeCat ? activeCat.id : null);
  }

  // Scalable method for external API fetching
  fetchPortalDataFromApi(): Observable<PortalApiResponseDto> {
    const mockApiResponse: PortalApiResponseDto = {
      hero: this.heroData(),
      categories: this.categoriesData(),
      featuredVideo: this.featuredVideoData(),
      resources: this.resourcesData(),
      paidCourses: this.paidCoursesData()
    };
    return of(mockApiResponse);
  }

  loadApiData(): void {
    this.fetchPortalDataFromApi().subscribe(response => {
      this.heroData.set(mapHeroDtoToModel(response.hero));
      this.categoriesData.set(response.categories.map(mapCategoryChipDtoToModel));
      this.featuredVideoData.set(mapFeaturedVideoDtoToModel(response.featuredVideo));
      this.resourcesData.set(response.resources.map(mapResourceCardDtoToModel));
      this.paidCoursesData.set(response.paidCourses.map(mapPaidCourseDtoToModel));
    });
  }
}
