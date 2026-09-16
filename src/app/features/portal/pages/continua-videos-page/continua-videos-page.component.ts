import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PortalService } from '../../services/portal.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { ReelVideo } from '../../model/content.model';

@Component({
  selector: 'app-continua-videos-page',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './continua-videos-page.component.html',
  styleUrl: './continua-videos-page.component.css'
})
export class ContinuaVideosPageComponent implements OnInit {
  portalService = inject(PortalService);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  activeSafeVideoUrl = signal<SafeResourceUrl | null>(null);

  // Pagination State
  pageSize = signal<number>(6);
  currentPage = signal<number>(1);

  totalPages = computed(() => {
    const total = this.portalService.filteredVideos().length;
    return Math.ceil(total / this.pageSize()) || 1;
  });

  paginatedVideos = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.portalService.filteredVideos().slice(start, start + this.pageSize());
  });

  pagesArray = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    // Read query parameter 'q' if navigated from header
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.portalService.setVideoCatalogSearch(params['q']);
        this.currentPage.set(1);
      }
    });
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.portalService.setVideoCatalogSearch(input.value);
    this.currentPage.set(1);
  }

  onAuthorChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.portalService.setVideoAuthorFilter(select.value);
    this.currentPage.set(1);
  }

  onYearChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.portalService.setVideoYearFilter(select.value);
    this.currentPage.set(1);
  }

  onCategoryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.portalService.setVideoCategoryFilter(select.value);
    this.currentPage.set(1);
  }

  onResetFilters(): void {
    this.portalService.resetVideoFilters();
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

  onPlayVideo(video: ReelVideo): void {
    this.portalService.selectReel(video);
    const embedUrl = `${video.fullYoutubeUrl}?autoplay=1&rel=0`;
    this.activeSafeVideoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl));
  }

  onCloseModal(): void {
    this.portalService.selectReel(null);
    this.activeSafeVideoUrl.set(null);
  }
}
