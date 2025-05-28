import { Component, OnInit } from '@angular/core';
import { Alliance } from '../../../_core/models/alliance.interface';
import { EXALLIANCE } from '../../../_core/constants/static-data/alliance-data';
import { FindManyAlliance } from '../../../_core/service/alliance/find/find-alliance';
import { Result } from '../../../_core/_utils/result';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'section-alliance',
  standalone: true,
  imports: [
    HttpClientModule
  ],
  templateUrl: './section-alliance.component.html',
  styleUrl: './section-alliance.component.scss'
})
export class SectionAllianceComponent implements OnInit {
  
  findAlliances = new FindManyAlliance()
  
  ngOnInit(): void {
    this.findAlliances.execute({ page: 0, perPage: 20 }).subscribe({
      next: (e: Result<Alliance[]>) => {
          if ( !e.IsError() ) {
            this.alliances = e.getValue()
          }
      }
    })

    setInterval( () => {
      this.nextSlide()
    } , 6000)
  }

  alliances: Alliance[] = []
  currentIndex = 1

  nextSlide() {
    if (this.currentIndex + 4 <= this.alliances.length) 
      this.currentIndex = (this.currentIndex + 1)
    else this.currentIndex = 1
  }

  prevSlide() {
    if (this.currentIndex - 1 > 0 )
      this.currentIndex = (this.currentIndex - 1)
  }
}
