import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortalService } from '../../services/portal.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-tech-skills-page',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tech-skills-page.component.html',
  styleUrl: './tech-skills-page.component.css'
})
export class TechSkillsPageComponent implements OnInit {
  portalService = inject(PortalService);

  // Pagination State
  pageSize = signal<number>(6);
  currentPage = signal<number>(1);

  totalPages = computed(() => {
    const total = this.portalService.filteredTechSkills().length;
    return Math.ceil(total / this.pageSize()) || 1;
  });

  paginatedTechSkills = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.portalService.filteredTechSkills().slice(start, start + this.pageSize());
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
    this.portalService.setTechSkillSearchQuery(input.value);
    this.currentPage.set(1);
  }

  onSelectTag(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.portalService.setTechSkillTagFilter(select.value);
    this.currentPage.set(1);
  }

  onResetFilters(): void {
    this.portalService.resetTechSkillFilters();
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
}
