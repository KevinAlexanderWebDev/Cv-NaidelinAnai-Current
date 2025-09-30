import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  animations: [
    trigger('zoomInStagger', [
      transition(':enter', [
        query('.skill-item', [
          style({ opacity: 0, transform: 'scale(0.8)' }),
          stagger(100, [
            animate(
              '400ms ease-out',
              style({ opacity: 1, transform: 'scale(1)' })
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class Skills {
  activeIndex = 0;

  skills = [
    {
      icon: '🫴',
      title: 'Atención al cliente',
      description: 'Empática, clara y resolutiva en el trato con personas.',
    },
    {
      icon: '📦',
      title: 'Logística',
      description: 'Organización de entregas, inventario y coordinación operativa.',
    },
    {
      icon: '🏦',
      title: 'Administración y Manejo de efectivo',
      description: 'Gestión de documentos, citas y apoyo contable nivel avanzado.',
    },
    {
      icon: '💬',
      title: 'Comunicación Efectiva',
      description: 'Expresión clara, escucha activa y trato igualitario.',
    },
  ];

  nextSkill(): void {
    this.activeIndex = (this.activeIndex + 1) % this.skills.length;
  }
}
