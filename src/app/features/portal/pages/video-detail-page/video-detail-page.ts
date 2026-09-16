import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PortalService } from '../../services/portal.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-video-detail-page',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './video-detail-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private portalService = inject(PortalService);
  private sanitizer = inject(DomSanitizer);

  video = signal<any>(null);
  activeSafeVideoUrl = signal<SafeResourceUrl | null>(null);
  activeTab = signal<'descripcion' | 'disertante' | 'material'>('descripcion');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        const found = this.portalService.getReelById(slug) || this.portalService.getSidanoPillById(slug);
        this.video.set(found);

        if (found) {
          const url = (found as any).fullYoutubeUrl || (found as any).youtubeUrl;
          if (url) {
             this.activeSafeVideoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(`${url}?autoplay=0&rel=0`));
          }
        }
      }
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
  }

  setTab(tab: 'descripcion' | 'disertante' | 'material') {
    this.activeTab.set(tab);
  }
}
