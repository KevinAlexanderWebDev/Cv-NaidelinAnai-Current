import {
  Component,
  ElementRef,
  Renderer2,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  animations: [
    trigger('fadeBlur', [
      transition(':enter', [
        style({ opacity: 0, filter: 'blur(8px)' }),
        animate('600ms ease-out', style({ opacity: 1, filter: 'blur(0)' }))
      ])
    ])
  ]
})
export class Contact implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const form = this.el.nativeElement.querySelector('.form');
    const button = form.querySelector('button');

    form.addEventListener('submit', async (event: Event) => {
      event.preventDefault();
      button.classList.add('loading');
      this.renderer.removeClass(this.el.nativeElement, 'success');
      this.renderer.removeClass(this.el.nativeElement, 'error');

      const data = new FormData(form);
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { Accept: 'application/json' }
        });

        if (response.ok) {
          form.reset();
          this.renderer.addClass(this.el.nativeElement, 'success');
          this.showToast('✅ ¡Mensaje enviado con éxito!');
        } else {
          const result = await response.json();
          const errorMsg = result.errors
            ? result.errors.map((e: any) => e.message).join(', ')
            : '❌ Ocurrió un error. Intenta de nuevo.';
          this.renderer.addClass(this.el.nativeElement, 'error');
          this.showToast(errorMsg);
        }
      } catch (error) {
        this.renderer.addClass(this.el.nativeElement, 'error');
        this.showToast('❌ Error de conexión. Intenta más tarde.');
      } finally {
        button.classList.remove('loading');

        setTimeout(() => {
          this.renderer.removeClass(this.el.nativeElement, 'success');
          this.renderer.removeClass(this.el.nativeElement, 'error');
        }, 4000);
      }
    });
  }

  showToast(message: string): void {
    const toast = this.renderer.createElement('div');
    this.renderer.addClass(toast, 'toast');
    this.renderer.setProperty(toast, 'textContent', message);
    this.renderer.appendChild(document.body, toast);

    setTimeout(() => {
      this.renderer.removeChild(document.body, toast);
    }, 4000);
  }
}
