import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { ResourceCard } from '../../model/content.model';

@Component({
  selector: 'app-resources-grid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resources-grid.component.html',
  styleUrl: './resources-grid.component.css'
})
export class ResourcesGridComponent {
  resources = input.required<ResourceCard[]>();
  
  activeModal = signal<string | null>(null);
  modalTitle = signal<string>('');
  modalIcon = signal<string>('folder');
  modalDescription = signal<string>('');
  modalButtonText = signal<string>('Aceptar');

  openModal(type: string): void {
    this.activeModal.set(type);
    if (type === 'publico') {
      this.modalTitle.set('Guía para el Público en General');
      this.modalIcon.set('groups');
      this.modalDescription.set('Consulte información clave sobre legalizaciones, autorizaciones de viaje para menores, poderes generales y requisitos de escrituración.');
      this.modalButtonText.set('Ver Guías de Trámites');
    } else if (type === 'manual') {
      this.modalTitle.set('Manual de Ética Notarial');
      this.modalIcon.set('gavel');
      this.modalDescription.set('Compendio regulatorio de deontología profesional del notariado de la Provincia de Córdoba.');
      this.modalButtonText.set('Descargar Manual (PDF)');
    } else if (type === 'archivo') {
      this.modalTitle.set('Archivo de Protocolos');
      this.modalIcon.set('folder_special');
      this.modalDescription.set('Consulte el sistema informatizado de localización y pedido de copias de escrituras de más de 30 años de antigüedad.');
      this.modalButtonText.set('Ingresar al Buscador');
    } else if (type === 'biblioteca') {
      this.modalTitle.set('Biblioteca Notarial Digital');
      this.modalIcon.set('menu_book');
      this.modalDescription.set('Acceda a más de 10.000 libros, ponencias, doctrina y jurisprudencia notarial especializada.');
      this.modalButtonText.set('Abrir Catálogo Digital');
    } else {
      this.modalTitle.set('Listado de Notarios Colegiados');
      this.modalIcon.set('list_alt');
      this.modalDescription.set('Buscador oficial de escribanos de registro habilitados en la Provincia de Córdoba.');
      this.modalButtonText.set('Buscar Escribanos');
    }
  }

  onModalAction(): void {
    alert(`Acción ejecutada correctamente para: ${this.modalTitle()}`);
    this.activeModal.set(null);
  }
}
