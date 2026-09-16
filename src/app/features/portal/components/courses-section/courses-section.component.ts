import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaidCourse } from '../../model/content.model';

@Component({
  selector: 'app-courses-section',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './courses-section.component.html',
  styleUrl: './courses-section.component.css'
})
export class CoursesSectionComponent {
  courses = input.required<PaidCourse[]>();
  selectedCourse = signal<PaidCourse | null>(null);
  enrolledSuccess = signal<boolean>(false);

  openCourseDetails(course: PaidCourse): void {
    this.selectedCourse.set(course);
    this.enrolledSuccess.set(false);
  }

  closeModal(): void {
    this.selectedCourse.set(null);
    this.enrolledSuccess.set(false);
  }

  onEnrollCourse(): void {
    this.enrolledSuccess.set(true);
  }

  scrollLeft(container: HTMLElement): void {
    container.scrollBy({ left: -320, behavior: 'smooth' });
  }

  scrollRight(container: HTMLElement): void {
    container.scrollBy({ left: 320, behavior: 'smooth' });
  }
}
