import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { RelatedContent } from '../../model/event.model';

@Component({
  selector: 'app-event-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './event-sidebar.component.html',
  styleUrl: './event-sidebar.component.css'
})
export class EventSidebarComponent {
  relatedItems = input.required<RelatedContent[]>();
  openCertificationModal = signal<boolean>(false);

  onRelatedClick(item: RelatedContent): void {
    alert(`Visualizando contenido relacionado: "${item.title}".`);
  }

  onApplyCertification(): void {
    alert('Solicitud de admisión para la Certificación Digital recibida con éxito.');
    this.openCertificationModal.set(false);
  }
}
