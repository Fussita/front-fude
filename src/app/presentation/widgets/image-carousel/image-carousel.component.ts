import { CommonModule } from '@angular/common';
import { Component, effect, Input, signal } from '@angular/core';
import { Activities } from '../../../_core/models/activities.interface';

@Component({
  selector: 'image-carousel',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss'
})
export class ImageCarouselComponent {
  @Input() data: Activities[] = [];
  @Input() interval: number = 3000;
  ind = signal(0);

  ngOnInit() {
      setInterval(() => {
        this.next();
      }, this.interval);
  }

  next() {
    this.ind.update(i => (i + 1) % this.data.length);
  }

  prev() {
    this.ind.update(i => (i - 1 + this.data.length) % this.data.length);
  }

  goTo(i: number) {
    this.ind.set(i);
  }
}
