import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { EventDetail } from '../../model/event.model';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { MobileNavComponent } from '../../../../shared/components/mobile-nav/mobile-nav.component';
import { EventCardComponent } from '../../components/event-card/event-card.component';

@Component({
  selector: 'app-events-list-page',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    FooterComponent,
    MobileNavComponent,
    EventCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './events-list-page.component.html',
  styleUrl: './events-list-page.component.css'
})
export class EventsListPage {
  private eventsService = inject(EventsService);

  searchFilter = signal<string>('');
  selectedTag = signal<string | null>(null);

  allEvents = signal<EventDetail[]>(this.eventsService.getAllEvents());

  filteredEvents = computed(() => {
    const query = this.searchFilter().toLowerCase().trim();
    const tag = this.selectedTag();
    
    return this.allEvents().filter(e => {
      const matchesQuery = !query || e.title.toLowerCase().includes(query) || e.location.toLowerCase().includes(query);
      const matchesTag = !tag || e.badge === tag;
      return matchesQuery && matchesTag;
    });
  });

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchFilter.set(value);
  }

  resetFilters(): void {
    this.searchFilter.set('');
    this.selectedTag.set(null);
  }
}
