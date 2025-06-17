import { Component } from '@angular/core';
import { EXACTIVITIES } from '../../../_core/constants/static-data/activities-data';
import { Activities } from '../../../_core/models/activities.interface';
import { ImageCarouselComponent } from '../image-carousel/image-carousel.component';

@Component({
  selector: 'section-activity',
  standalone: true,
  imports: [
    ImageCarouselComponent
  ],
  templateUrl: './section-activity.component.html',
  styleUrl: './section-activity.component.scss'
})
export class SectionActivityComponent {

  activities: Activities[] = EXACTIVITIES

  ngOnInit(): void {
    this.formatText()

  }

  formatText() {
    for (let i of this.activities) {
      const words = i.descripcion.trim().split(/\s+/)
      if (words.length >= 65)
        i.descripcion = words.slice(0, 80).join(" ") + "..."
    }
  }

}
