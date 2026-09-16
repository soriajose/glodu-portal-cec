import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeaturedVideo } from '../../model/content.model';

@Component({
  selector: 'app-featured-video',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './featured-video.component.html',
  styleUrl: './featured-video.component.css'
})
export class FeaturedVideoComponent {
  videoData = input.required<FeaturedVideo>();
  openPreviewModal = signal<boolean>(false);
}
