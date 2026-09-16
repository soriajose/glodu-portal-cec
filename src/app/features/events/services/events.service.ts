import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EventDetail, mapEventDetailDtoToModel } from '../model/event.model';
import { EventDetailDto } from '../dto/event.dto';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private primaryEventData: EventDetailDto = {
    id: '1',
    slug: '22-jornada-notarial-cordobesa',
    title: '22° Jornada Notarial Cordobesa: Conocimiento y Visión de Futuro',
    date: '15 de Octubre, 2024',
    location: 'Sede Central, Córdoba',
    badge: 'Exclusivo Escribanos',
    videoTitle: 'Sesión Plenaria: El Futuro del Notariado Digital',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    details: [
      'La 22° Jornada Notarial Cordobesa se consolida como el espacio de debate técnico y doctrinario más importante de nuestra provincia. En esta edición, el eje central gira en torno a la intersección entre la seguridad jurídica tradicional y las nuevas herramientas tecnológicas.',
      'Se abordarán temas críticos como la protocolización digital, la identidad soberana en el entorno blockchain y los desafíos éticos de la inteligencia artificial aplicados a la función notarial.',
      'Nuevos paradigmas en la contratación digital.',
      'El rol del escribano como garante de fe pública en entornos virtuales.',
      'Actualización sobre normativa UIF y prevención de lavado.'
    ],
    speakers: [
      {
        id: 's1',
        name: 'Dr. Esteban D\'Alessio',
        role: 'Experto en Derecho Notarial y Doctrina',
        initials: 'ED',
        colorClass: 'bg-[#2F4997] text-white'
      },
      {
        id: 's2',
        name: 'Esc. María López',
        role: 'Presidente Comisión Innovación Tecnológica',
        initials: 'ML',
        colorClass: 'bg-[#8df5e4] text-[#007165]'
      },
      {
        id: 's3',
        name: 'Dr. Carlos Benítez',
        role: 'Especialista en Prevención de Lavado y Normativa UIF',
        initials: 'CB',
        colorClass: 'bg-[#ffe088] text-[#574500]'
      }
    ],
    downloads: [
      {
        id: 'd1',
        title: 'Programa_de_Actividades_Jornada2024.pdf',
        fileType: 'pdf',
        fileSize: '1.8 MB'
      },
      {
        id: 'd2',
        title: 'Ponencia_Central_Desafios_Digitales.pdf',
        fileType: 'pdf',
        fileSize: '4.2 MB'
      },
      {
        id: 'd3',
        title: 'Guia_Protocolizacion_Firma_Digital.pdf',
        fileType: 'pdf',
        fileSize: '3.1 MB'
      }
    ],
    relatedContent: [
      {
        id: 'r1',
        title: 'Tecnología, innovación y nuevos desafíos jurídicos',
        snippet: 'Los ejes que debatirá el Notariado Novel en su próximo encuentro regional en Córdoba.',
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
        slug: 'tecnologia-innovacion-desafios'
      },
      {
        id: 'r2',
        title: 'Partición de Herencia e Indivisión',
        snippet: 'Análisis detallado sobre los nuevos procedimientos de partición postcomunitaria y escrituración.',
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop',
        slug: 'particion-herencia-indivision'
      }
    ]
  };

  private eventsList = signal<EventDetail[]>([
    mapEventDetailDtoToModel(this.primaryEventData),
    {
      id: '2',
      slug: 'seminario-firmas-digitales',
      title: 'Seminario Práctico sobre Firmas Digitales y Token Notarial',
      date: '28 de Noviembre, 2024',
      location: 'Delegación Río Cuarto / Transmisión Online',
      badge: 'Abierto al Público',
      videoTitle: 'Taller de Configuración de Hardware y Firma Digital',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
      details: [
        'Aprenda el uso correcto del token notarial, la infraestructura de clave pública (PKI) y los estándares de validación de documentos remotos.',
        'Casos prácticos de certificación en plataformas gubernamentales e internacionales.'
      ],
      speakers: [
        { id: 's4', name: 'Ing. Roberto Gómez', role: 'Seguridad de la Información', initials: 'RG', colorClass: 'bg-[#2F4997] text-white' }
      ],
      downloads: [
        { id: 'd4', title: 'Instructivo_Token_Notarial.pdf', fileType: 'pdf', fileSize: '2.5 MB' }
      ],
      relatedContent: []
    },
    {
      id: '3',
      slug: 'encuentro-provincial-notarios-noveles',
      title: 'Encuentro Provincial de Notarios Noveles 2025',
      date: '10 de Marzo, 2025',
      location: 'Sede Central, Córdoba',
      badge: 'Notarios Noveles',
      videoTitle: 'Mesa Redonda: Primeros años en el ejercicio de la función',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
      details: [
        'Intercambio de experiencias, redacción de minutas complejas y manejo de legajos de protocolo.',
        'Mentoría con escribanos titulares de destacada trayectoria.'
      ],
      speakers: [
        { id: 's5', name: 'Esc. Lucía Peralta', role: 'Coordinadora de Noveles', initials: 'LP', colorClass: 'bg-[#8df5e4] text-[#007165]' }
      ],
      downloads: [],
      relatedContent: []
    }
  ]);

  currentEvent = signal<EventDetail>(mapEventDetailDtoToModel(this.primaryEventData));

  // Get event by slug
  getEventBySlug(slug: string): EventDetail {
    const found = this.eventsList().find(e => e.slug === slug);
    return found ? found : this.currentEvent();
  }

  // Get all events
  getAllEvents(): EventDetail[] {
    return this.eventsList();
  }

  // Scalable external API call getter
  fetchEventDetailFromApi(slug: string): Observable<EventDetailDto> {
    const found = this.eventsList().find(e => e.slug === slug);
    if (found) {
      return of({
        id: found.id,
        slug: found.slug,
        title: found.title,
        date: found.date,
        location: found.location,
        badge: found.badge,
        videoTitle: found.videoTitle,
        videoUrl: found.videoUrl,
        thumbnailUrl: found.thumbnailUrl,
        details: found.details,
        speakers: found.speakers,
        downloads: found.downloads,
        relatedContent: found.relatedContent
      });
    }
    return of(this.primaryEventData);
  }
}
