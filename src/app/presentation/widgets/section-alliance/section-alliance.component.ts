import { Component, OnInit } from '@angular/core';
import { Result } from '../../../_core/_utils/result';
import { HttpClientModule } from '@angular/common/http';
import { Institution } from '../../../_core/models/institution.interface';
import { FindManyInstitution } from '../../../_core/service/institution/find/find-institution';

@Component({
  selector: 'section-alliance',
  standalone: true,
  imports: [
    HttpClientModule,
  ],
  templateUrl: './section-alliance.component.html',
  styleUrl: './section-alliance.component.scss'
})
export class SectionAllianceComponent implements OnInit {
  
    insti: Institution[] = []
    img: string[] = []
    ngOnInit(): void {
      this.findInsti.execute({ page: 0, perPage: 20 }).subscribe({
        next: (e: Result<Institution[]>) => {
          if ( !e.IsError() ) {
            this.insti = e.getValue()
            this.insti.forEach( e => this.img.push(e.image))
          }
        }
      })
    }
  
    findInsti = new FindManyInstitution()      
    
}
