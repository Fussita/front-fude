import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AllianceForm } from '../../../interfaces/control-forms.interface';
import { ADD_INSTITUTION_NAME, ADD_INSTITUTION_DESCRIPTION } from '../../../interfaces/validators/group-validators.interface';
import { ValidatorService } from '../../../services/form-validator/validator.service';
import { HeaderSimpleComponent } from '../../../widgets/header-simple/header-simple.component';
import { UpdateAlliance } from '../../../../_core/service/alliance/update/update-alliance';
import { ActivatedRoute } from '@angular/router';
import { Institution } from '../../../../_core/models/institution.interface';
import { Result } from '../../../../_core/_utils/result';
import { FindManyInstitution } from '../../../../_core/service/institution/find/find-institution';
import { ToastBarService } from '../../../services/toast-bar/toast-bar.service';
import { NgClass } from '@angular/common';
import { FindManyAlliance } from '../../../../_core/service/alliance/find/find-alliance';
import { Alliance } from '../../../../_core/models/alliance.interface';
import { EXALLIANCE } from '../../../../_core/constants/static-data/alliance-data';

@Component({
  selector: 'app-adm-mod-alliance-page',
  standalone: true,
  imports: [
      HeaderSimpleComponent,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      NgClass
  ],
  templateUrl: './adm-mod-alliance-page.component.html',
  styleUrl: './adm-mod-alliance-page.component.scss'
})
export class AdmModAlliancePageComponent implements OnInit {

  creationDate = ''

  constructor(private route: ActivatedRoute) {}
  currentId: string|null = ''
  
  onFileChange(event: any) {
    this.creationDate = event.target.value
  }

  val = inject(ValidatorService)
  private fb = inject(FormBuilder)  
  public xform: FormGroup<AllianceForm> = this.fb.group<AllianceForm>({
    name: new FormControl( null, ADD_INSTITUTION_NAME ),
    description: new FormControl( null, ADD_INSTITUTION_DESCRIPTION ),
  })
  
  isVal(field: string){ return this.val.isValid(this.xform, field) }
  gErr(field: string) { return this.val.getError(this.xform, field) }

  institutionId = ''

  mod() {
    if ( !this.currentId ) throw new Error('')
      let rt: {
        id: string
        name?: string
        description?: string
        creationDate?: string       
        institutionId?: string
      } = { id: this.currentId }
      if (this.xform.value.name) rt = { name: this.xform.value.name, ...rt }
      if (this.xform.value.description) rt = { description: this.xform.value.description, ...rt }
      if (this.institutionId) rt = { institutionId: this.institutionId, ...rt }
      if (this.creationDate) rt = { creationDate: this.creationDate, ...rt }
      
      this.modAlliance.execute(rt).subscribe({
        next: (e) => {
            if (e.IsError()) 
              this.toast.shootToast('Proceso Fallido', e.getError().message,'top', 'error')
            else 
              this.toast.shootToast('Registro Exitoso', 'Aliado registrado exitosamente','top', 'success')
        }
      })
  }

  modAlliance = new UpdateAlliance()
  private toast = inject(ToastBarService)
  findInsti = new FindManyInstitution()      
  findAlli = new FindManyAlliance()      
  
  insti: Institution[] = []
  alli: Alliance = EXALLIANCE[0]
  
  ngOnInit(): void {
    this.currentId = this.route.snapshot.paramMap.get('id')
    
    this.findAlli.execute({ page: 0, perPage: 20 }).subscribe({
      next: (e: Result<Alliance[]>) => {
          if ( !e.IsError() ) 
            e.getValue().forEach( e => { if (e.id == this.currentId) this.alli = e })
        }
    })

    this.findInsti.execute({ page: 0, perPage: 20 }).subscribe({
      next: (e: Result<Institution[]>) => {
          if ( !e.IsError() ) this.insti = e.getValue()
        }
    })
  }
      
  addItem( item: Institution ) {
    this.institutionId = item.id
  }
  
  verify ( id: string ) {
    if (this.institutionId == id) return true
    return false
  }
  
}
