import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortalService } from '../../services/portal.service';
import { TechSkillCourse } from '../../model/content.model';

@Component({
  selector: 'app-tech-skills',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tech-skills.component.html',
  styleUrl: './tech-skills.component.css'
})
export class TechSkillsComponent {
  portalService = inject(PortalService);

  selectedCourse = signal<TechSkillCourse | null>(null);
  enrolledSuccess = signal<boolean>(false);

  onOpenDetails(course: TechSkillCourse): void {
    this.selectedCourse.set(course);
    this.enrolledSuccess.set(false);
  }

  onCloseModal(): void {
    this.selectedCourse.set(null);
    this.enrolledSuccess.set(false);
  }

  onEnroll(): void {
    this.enrolledSuccess.set(true);
  }

  scrollLeft(container: HTMLElement): void {
    container.scrollBy({ left: -320, behavior: 'smooth' });
  }

  scrollRight(container: HTMLElement): void {
    container.scrollBy({ left: 320, behavior: 'smooth' });
  }
}
