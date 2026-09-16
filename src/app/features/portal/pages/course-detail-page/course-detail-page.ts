import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PortalService } from '../../services/portal.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-course-detail-page',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './course-detail-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private portalService = inject(PortalService);

  course = signal<any>(null);
  activeTab = signal<'programa' | 'docente' | 'requisitos'>('programa');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        const found = this.portalService.getCourseById(slug) || this.portalService.getTechSkillById(slug);
        this.course.set(found);
      }
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
  }

  setTab(tab: 'programa' | 'docente' | 'requisitos') {
    this.activeTab.set(tab);
  }
}
