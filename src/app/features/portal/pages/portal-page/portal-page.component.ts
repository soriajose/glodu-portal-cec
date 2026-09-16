import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { PortalService } from '../../services/portal.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { MobileNavComponent } from '../../../../shared/components/mobile-nav/mobile-nav.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ContinuousTrainingComponent } from '../../components/continuous-training/continuous-training.component';
import { VirtualClassroomCardComponent } from '../../components/virtual-classroom-card/virtual-classroom-card.component';
import { CoursesSectionComponent } from '../../components/courses-section/courses-section.component';
import { SidanoPillsComponent } from '../../components/sidano-pills/sidano-pills.component';
import { TechSkillsComponent } from '../../components/tech-skills/tech-skills.component';

@Component({
  selector: 'app-portal-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    MobileNavComponent,
    HeroComponent,
    ContinuousTrainingComponent,
    VirtualClassroomCardComponent,
    CoursesSectionComponent,
    SidanoPillsComponent,
    TechSkillsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './portal-page.component.html',
  styleUrl: './portal-page.component.css'
})
export class PortalPage implements OnInit {
  protected portalService = inject(PortalService);

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    this.portalService.loadApiData();
  }
}
