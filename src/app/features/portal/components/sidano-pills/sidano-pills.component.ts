import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PortalService } from '../../services/portal.service';
import { SidanoPill } from '../../model/content.model';

@Component({
  selector: 'app-sidano-pills',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidano-pills.component.html',
  styleUrl: './sidano-pills.component.css'
})
export class SidanoPillsComponent {
  portalService = inject(PortalService);
  private sanitizer = inject(DomSanitizer);

  selectedPill = signal<SidanoPill | null>(null);
  activeSafeVideoUrl = signal<SafeResourceUrl | null>(null);

  onOpenPill(pill: SidanoPill): void {
    this.selectedPill.set(pill);
    const embedUrl = `${pill.youtubeUrl}?autoplay=1&rel=0`;
    this.activeSafeVideoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl));
  }

  onCloseModal(): void {
    this.selectedPill.set(null);
    this.activeSafeVideoUrl.set(null);
  }

  scrollLeft(container: HTMLElement): void {
    container.scrollBy({ left: -320, behavior: 'smooth' });
  }

  scrollRight(container: HTMLElement): void {
    container.scrollBy({ left: 320, behavior: 'smooth' });
  }
}
