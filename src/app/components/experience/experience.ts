import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
  ],
})
export class Experience implements AfterViewInit {
  ngAfterViewInit(): void {
    const trigger = document.getElementById('cv-trigger');
    const overlay = document.getElementById('cv-overlay');
    const closeBtn = document.getElementById('close-cv');
    const cvImage = document.getElementById('cv-image');
    const wrapper = document.getElementById('cv-wrapper');

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let scrollTop = 0;

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && overlay?.style.display === 'block') {
        overlay.style.display = 'none';
        if (cvImage) cvImage.classList.remove('zoomed');
        if (wrapper) wrapper.classList.remove('zoomed');
      }
    });

    if (trigger && overlay && closeBtn) {
      trigger.addEventListener('click', () => {
        overlay.style.display = 'block';
      });

      closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        if (cvImage) cvImage.classList.remove('zoomed');
        if (wrapper) wrapper.classList.remove('zoomed');
      });

      overlay.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const isOutside = !target.closest('#cv-container');
        if (isOutside) {
          overlay.style.display = 'none';
          if (cvImage) cvImage.classList.remove('zoomed');
          if (wrapper) wrapper.classList.remove('zoomed');
        }
      });
    }

    if (cvImage && wrapper) {
      const activateZoomAt = (clientX: number, clientY: number) => {
        const rect = wrapper.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;

        cvImage.classList.add('zoomed');
        wrapper.classList.add('zoomed');

        setTimeout(() => {
          const zoomFactor = 1.5;
          const scrollX = offsetX * zoomFactor - wrapper.clientWidth / 2;
          const scrollY = offsetY * zoomFactor - wrapper.clientHeight / 2;
          wrapper.scrollLeft = scrollX;
          wrapper.scrollTop = scrollY;
        }, 50);
      };

      cvImage.addEventListener('click', (e) => {
        if (!cvImage.classList.contains('zoomed')) {
          activateZoomAt(e.clientX, e.clientY);
        } else {
          cvImage.classList.remove('zoomed');
          wrapper.classList.remove('zoomed');
        }
      });

      cvImage.addEventListener('touchstart', (e) => {
        if (!cvImage.classList.contains('zoomed')) {
          const touch = e.touches[0];
          activateZoomAt(touch.clientX, touch.clientY);
        } else {
          cvImage.classList.remove('zoomed');
          wrapper.classList.remove('zoomed');
        }
      });

      wrapper.addEventListener('mousedown', (e) => {
        if (!wrapper.classList.contains('zoomed')) return;
        isDragging = true;
        startX = e.pageX - wrapper.offsetLeft;
        startY = e.pageY - wrapper.offsetTop;
        scrollLeft = wrapper.scrollLeft;
        scrollTop = wrapper.scrollTop;
        wrapper.style.cursor = 'grabbing';
      });

      wrapper.addEventListener('mouseleave', () => {
        isDragging = false;
        wrapper.style.cursor = 'grab';
      });

      wrapper.addEventListener('mouseup', () => {
        isDragging = false;
        wrapper.style.cursor = 'grab';
      });

      wrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const y = e.pageY - wrapper.offsetTop;
        const walkX = x - startX;
        const walkY = y - startY;
        wrapper.scrollLeft = scrollLeft - walkX;
        wrapper.scrollTop = scrollTop - walkY;
      });

      wrapper.addEventListener('touchstart', (e) => {
        if (!wrapper.classList.contains('zoomed')) return;
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.pageX - wrapper.offsetLeft;
        startY = touch.pageY - wrapper.offsetTop;
        scrollLeft = wrapper.scrollLeft;
        scrollTop = wrapper.scrollTop;
      });

      wrapper.addEventListener('touchend', () => {
        isDragging = false;
      });

      wrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const x = touch.pageX - wrapper.offsetLeft;
        const y = touch.pageY - wrapper.offsetTop;
        const walkX = x - startX;
        const walkY = y - startY;
        wrapper.scrollLeft = scrollLeft - walkX;
        wrapper.scrollTop = scrollTop - walkY;
      });
    }
  }
}
