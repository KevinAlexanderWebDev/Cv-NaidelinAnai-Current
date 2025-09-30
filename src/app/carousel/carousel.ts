import {
  Component,
  AfterViewInit,
  QueryList,
  ViewChildren,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../components/header/header';
import { About } from '../components/about/about';
import { Courses } from '../components/courses/courses';
import { Experience } from '../components/experience/experience';
import { Skills } from '../components/skills/skills';
import { Contact } from '../components/contact/contact';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, Header, About, Experience, Skills, Contact, Courses],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class Carousel implements AfterViewInit {
  currentSlide = 0;

  @ViewChildren('slideRef') slides!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit(): void {
    this.activateSlide(0);
  }

  activateSlide(index: number): void {
    this.slides.forEach((slide, i) => {
      slide.nativeElement.classList.toggle('active', i === index);
    });
    this.currentSlide = index;
  }

  next(): void {
    const total = this.slides.length;
    const nextIndex = (this.currentSlide + 1) % total;
    this.activateSlide(nextIndex);
  }

  prev(): void {
    const total = this.slides.length;
    const prevIndex = (this.currentSlide - 1 + total) % total;
    this.activateSlide(prevIndex);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.next();
    } else if (event.key === 'ArrowLeft') {
      this.prev();
    }
  }
}
