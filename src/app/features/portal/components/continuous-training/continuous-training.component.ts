import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PortalService } from '../../services/portal.service';
import { ReelVideo } from '../../model/content.model';

@Component({
  selector: 'app-continuous-training',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './continuous-training.component.html',
  styleUrl: './continuous-training.component.css'
})
export class ContinuousTrainingComponent {
  portalService = inject(PortalService);
  private sanitizer = inject(DomSanitizer);

  selectedReel = signal<ReelVideo | null>(null);
  activeSafeVideoUrl = signal<SafeResourceUrl | null>(null);

  onOpenReel(reel: ReelVideo): void {
    this.selectedReel.set(reel);
    this.portalService.selectReel(reel);
    const embedUrl = `${reel.fullYoutubeUrl}?autoplay=1&rel=0`;
    this.activeSafeVideoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl));
  }

  onCloseModal(): void {
    this.selectedReel.set(null);
    this.portalService.selectReel(null);
    this.activeSafeVideoUrl.set(null);
  }

  scrollLeft(container: HTMLElement): void {
    container.scrollBy({ left: -320, behavior: 'smooth' });
  }

  scrollRight(container: HTMLElement): void {
    container.scrollBy({ left: 320, behavior: 'smooth' });
  }
}
