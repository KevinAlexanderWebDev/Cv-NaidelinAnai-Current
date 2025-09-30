import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  motivationalQuotes = [
    'El éxito es la suma de pequeños esfuerzos repetidos cada día.',
    'La empatía abre puertas que el conocimiento no puede.',
    'Cada reto es una oportunidad para crecer.',
    'La actitud positiva transforma cualquier entorno.',
    'La constancia supera al talento cuando el talento no se esfuerza.',
  ];

  selectedQuote = '';

  ngOnInit(): void {
    const randomIndex = Math.floor(
      Math.random() * this.motivationalQuotes.length
    );
    this.selectedQuote = this.motivationalQuotes[randomIndex];
  }
}
