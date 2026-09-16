import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PortalService } from '../../services/portal.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-enrollment-page',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './enrollment-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnrollmentPage implements OnInit {
  private route = inject(ActivatedRoute);
  private portalService = inject(PortalService);

  course = signal<any>(null);
  enrolledSuccess = signal<boolean>(false);

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

  onSubmit(e: Event) {
    e.preventDefault();
    this.enrolledSuccess.set(true);
  }
}
