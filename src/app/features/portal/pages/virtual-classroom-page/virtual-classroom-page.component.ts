import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortalService } from '../../services/portal.service';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

interface FaqItem {
  question: string;
  answer: string;
  open?: boolean;
}

@Component({
  selector: 'app-virtual-classroom-page',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './virtual-classroom-page.component.html',
  styleUrl: './virtual-classroom-page.component.css'
})
export class VirtualClassroomPageComponent implements OnInit {
  portalService = inject(PortalService);
  virtualCampusUrl = this.portalService.virtualCampusUrl;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }

  faqs = signal<FaqItem[]>([
    {
      question: '¿Cuáles son mis credenciales de primer ingreso?',
      answer: 'Tu usuario por defecto corresponde a tu número de matrícula profesional o DNI (sin puntos). Si es tu primer ingreso o participás de una diplomatura, recibirás un correo de confirmación con tu clave provisoria.',
      open: true
    },
    {
      question: '¿Qué hago si no recuerdo mi contraseña?',
      answer: 'En la pantalla de acceso del Aula Virtual podés hacer clic en "¿Olvidaste tu contraseña?". Se enviará un enlace de restablecimiento seguro a la casilla de correo registrada en el Colegio.',
      open: false
    },
    {
      question: '¿Puedo cursar y ver los contenidos desde el celular?',
      answer: 'Sí, la plataforma del Aula Virtual es 100% responsiva y se adapta a teléfonos inteligentes, tablets y computadoras portátiles o de escritorio.',
      open: false
    },
    {
      question: '¿Cuánto tiempo permanecen disponibles las grabaciones de clases?',
      answer: 'Las grabaciones de las clases sincrónicas y videoconferencias permanecen disponibles durante todo el período de dictado del módulo y hasta 30 días posteriores al examen final.',
      open: false
    }
  ]);

  toggleFaq(index: number): void {
    this.faqs.update(items =>
      items.map((item, i) =>
        i === index ? { ...item, open: !item.open } : item
      )
    );
  }
}
