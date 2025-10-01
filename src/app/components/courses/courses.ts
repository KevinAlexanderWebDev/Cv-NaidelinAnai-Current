import {
  Component,
  HostListener,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.html',
  styleUrls: ['./courses.scss'],
})
export class Courses implements AfterViewInit {
  @ViewChild('gridRef') gridRef!: ElementRef<HTMLDivElement>;
  isTinyScreen = false;
  selectedCert: any = null;

  ngOnInit(): void {
    this.checkScreenSize();
  }

  ngAfterViewInit(): void {
    if (this.isTinyScreen && this.gridRef) {
      requestAnimationFrame(() => {
        this.gridRef.nativeElement.scrollTo({ left: 0, behavior: 'auto' });
      });
    }
  }

  @HostListener('window:resize')
  checkScreenSize(): void {
    this.isTinyScreen = window.innerWidth < 768;
  }

  @HostListener('window:keydown', ['$event'])
  handleEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.selectedCert) {
      this.closeCert();
    }
  }

  openCert(cert: any): void {
    this.selectedCert = cert;
  }

  closeCert(): void {
    this.selectedCert = null;
  }

  certificates = [
    {
      title: 'Constancia de Capacitación | Prevención de riesgos laborales',
      issuer: 'Safety Colors',
      date: 'Octubre 2024',
      image: '/assets/documents/Certificado_prev_riesgoslab.png',
    },
    {
      title: 'Constancia de Capacitación | Basico de seguridad',
      issuer: 'Safety Colors',
      date: 'Noviembre 2024',
      image: '/assets/documents/Certificado_basico_seguridad.png',
    },
    {
      title: 'Carta Pasante',
      issuer: 'Terminación de estudios | Istna',
      date: 'Agosto 2025',
      image: '/assets/documents/Constancia_terminacion.png',
    },
  ];
}
