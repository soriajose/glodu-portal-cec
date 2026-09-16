import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';

@Component({
  selector: 'app-event-multimedia',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './event-multimedia.component.html',
  styleUrl: './event-multimedia.component.css'
})
export class EventMultimediaComponent {
  thumbnailUrl = input.required<string>();
  videoTitle = input.required<string>();
  videoUrl = input.required<string>();

  isPlaying = signal<boolean>(false);
}
