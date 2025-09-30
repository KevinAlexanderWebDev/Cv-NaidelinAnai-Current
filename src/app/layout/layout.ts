import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout implements OnInit, AfterViewInit {
  themeIcon = 'assets/icons/sol.png';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme + '-mode');
    this.themeIcon =
      savedTheme === 'dark' ? 'assets/icons/luna.png' : 'assets/icons/sol.png';
  }

  toggleTheme(): void {
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');

    body.classList.remove(isDark ? 'dark-mode' : 'light-mode');
    body.classList.add(isDark ? 'light-mode' : 'dark-mode');

    const nextTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', nextTheme);
    this.themeIcon =
      nextTheme === 'dark' ? 'assets/icons/luna.png' : 'assets/icons/sol.png';
  }

  ngAfterViewInit(): void {
    const openBtn = document.getElementById('open-form-btn');
    const overlay = document.getElementById('form-overlay');
    const closeBtn = document.getElementById('close-form');
    const whatsappForm = document.getElementById(
      'whatsapp-form'
    ) as HTMLFormElement;

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && overlay?.classList.contains('visible')) {
        overlay.classList.remove('visible');
        overlay.classList.add('hidden');
        openBtn?.classList.remove('hide-whatsapp');
      }
    });

    if (openBtn && overlay && closeBtn && whatsappForm) {
      openBtn.addEventListener('click', () => {
        overlay.classList.remove('hidden');
        overlay.classList.add('visible');
        openBtn.classList.add('hide-whatsapp');
      });

      closeBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        overlay.classList.remove('visible');
        overlay.classList.add('hidden');
        openBtn.classList.remove('hide-whatsapp');
      });

      overlay.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const isOutside = !target.closest('#form-container');

        if (isOutside) {
          overlay.classList.remove('visible');
          overlay.classList.add('hidden');
          openBtn.classList.remove('hide-whatsapp');
        }
      });

      whatsappForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name =
          (document.getElementById('name') as HTMLInputElement)?.value || '';
        const message =
          (document.getElementById('message') as HTMLTextAreaElement)?.value ||
          '';
        const phone = '527681107537';

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(
          `Hola, soy ${name}. ${message}`
        )}`;
        window.open(url, '_blank');
        overlay.classList.remove('visible');
        overlay.classList.add('hidden');
        openBtn.classList.remove('hide-whatsapp');
      });
    } else {
      console.warn('WhatsApp form elements not found in DOM.');
    }
  }
}
