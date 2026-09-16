import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { Speaker, DownloadMaterial } from '../../model/event.model';

@Component({
  selector: 'app-event-tabs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './event-tabs.component.html',
  styleUrl: './event-tabs.component.css'
})
export class EventTabsComponent {
  detailsParagraphs = input.required<string[]>();
  speakers = input.required<Speaker[]>();
  downloads = input.required<DownloadMaterial[]>();

  activeTab = signal<'detalles' | 'oradores' | 'descarga'>('detalles');

  onDownloadFile(item: DownloadMaterial): void {
    alert(`Descargando archivo institucional: ${item.title} (${item.fileSize}).`);
  }
}
