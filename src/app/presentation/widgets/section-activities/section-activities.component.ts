import { Component } from '@angular/core';
import { EXACTIVITIES } from '../../../_core/constants/static-data/activities-data';
import { Activities } from '../../../_core/models/activities.interface';

@Component({
  selector: 'section-activities',
  standalone: true,
  imports: [],
  templateUrl: './section-activities.component.html',
  styleUrl: './section-activities.component.scss'
})
export class SectionActivitiesComponent {

  activities: Activities[] = EXACTIVITIES

  ngOnInit(): void {
    this.formatText()
  }

  formatText() {
    for (let i of this.activities) {
      const words = i.descripcion.trim().split(/\s+/)
      if (words.length >= 80)
        i.descripcion = words.slice(0, 80).join(" ") + "..."
    }
  }

}
