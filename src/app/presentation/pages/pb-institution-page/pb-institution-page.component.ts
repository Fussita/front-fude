import { Component, OnInit } from '@angular/core';
import { HeaderSimpleComponent } from '../../widgets/header-simple/header-simple.component';
import { EXINSTI } from '../../../_core/constants/static-data/institution-data';
import { Institution } from '../../../_core/models/institution.interface';
import { HttpClientModule } from '@angular/common/http';
import { FindManyInstitution } from '../../../_core/service/institution/find/find-institution';
import { Result } from '../../../_core/_utils/result';

@Component({
  selector: 'pb-institution-page',
  standalone: true,
  imports: [
    HeaderSimpleComponent,
    HttpClientModule
  ],
  templateUrl: './pb-institution-page.component.html',
  styleUrl: './pb-institution-page.component.scss'
})
export class PbInstitutionPageComponent implements OnInit {
  
  ngOnInit(): void {
    this.findInsti.execute({ page: 0, perPage: 20 }).subscribe({
      next: (e: Result<Institution[]>) => {
        if ( !e.IsError() ) {
          this.insti = e.getValue()
        }
      }
    })
  }

  insti: Institution[] = []

  textRandom = `Colaboramos activamente con diversas instituciones que comparten nuestra visión de construir un mundo más equitativo y solidario. Estas organizaciones, comprometidas con el bienestar social, participan aportando recursos, conocimientos y voluntariado.`
 
  findInsti = new FindManyInstitution()
    

}