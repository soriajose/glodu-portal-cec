import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PortalService } from '../../services/portal.service';
import { SidanoPill } from '../../model/content.model';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-sidano-pills-page',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidano-pills-page.component.html',
  styleUrl: './sidano-pills-page.component.css'
})
export class SidanoPillsPageComponent implements OnInit {
  portalService = inject(PortalService);
  private sanitizer = inject(DomSanitizer);

  selectedPill = signal<SidanoPill | null>(null);
  activeSafeVideoUrl = signal<SafeResourceUrl | null>(null);

  // Pagination State
  pageSize = signal<number>(4);
  currentPage = signal<number>(1);

  totalPages = computed(() => {
    const total = this.portalService.filteredSidanoPills().length;
    return Math.ceil(total / this.pageSize()) || 1;
  });

  paginatedPills = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.portalService.filteredSidanoPills().slice(start, start + this.pageSize());
  });

  pagesArray = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.portalService.setSidanoSearchQuery(input.value);
    this.currentPage.set(1);
  }

  onSelectCategory(cat: string): void {
    this.portalService.setSidanoCategoryFilter(cat);
    this.currentPage.set(1);
  }

  onSelectYear(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.portalService.setSidanoYearFilter(select.value);
    this.currentPage.set(1);
  }

  onReset(): void {
    this.portalService.resetSidanoFilters();
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 260, behavior: 'smooth' });
      }
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  onOpenPill(pill: SidanoPill): void {
    this.selectedPill.set(pill);
    const embedUrl = `${pill.youtubeUrl}?autoplay=1&rel=0`;
    this.activeSafeVideoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl));
  }

  onCloseModal(): void {
    this.selectedPill.set(null);
    this.activeSafeVideoUrl.set(null);
  }
}
