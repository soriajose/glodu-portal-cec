import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { EventDetail } from '../../model/event.model';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { MobileNavComponent } from '../../../../shared/components/mobile-nav/mobile-nav.component';
import { EventMultimediaComponent } from '../../components/event-multimedia/event-multimedia.component';
import { EventTabsComponent } from '../../components/event-tabs/event-tabs.component';
import { EventSidebarComponent } from '../../components/event-sidebar/event-sidebar.component';

@Component({
  selector: 'app-event-detail-page',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    FooterComponent,
    MobileNavComponent,
    EventMultimediaComponent,
    EventTabsComponent,
    EventSidebarComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './event-detail-page.component.html',
  styleUrl: './event-detail-page.component.css'
})
export class EventDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private eventsService = inject(EventsService);

  eventData = signal<EventDetail>(this.eventsService.currentEvent());

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug') || '22-jornada-notarial-cordobesa';
      const event = this.eventsService.getEventBySlug(slug);
      this.eventData.set(event);
    });
  }
}
