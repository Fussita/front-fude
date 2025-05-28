import { Component, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AllianceForm } from '../../../interfaces/control-forms.interface';
import { ADD_INSTITUTION_NAME, ADD_INSTITUTION_DESCRIPTION } from '../../../interfaces/validators/group-validators.interface';
import { ValidatorService } from '../../../services/form-validator/validator.service';
import { HeaderSimpleComponent } from '../../../widgets/header-simple/header-simple.component';
import { CreateAlliance } from '../../../../_core/service/alliance/create/create-alliance';
import { CreateAllianceResponse } from '../../../../_core/service/alliance/create/types/create-alliance.response';
import { Result } from '../../../../_core/_utils/result';
import { Alliance } from '../../../../_core/models/alliance.interface';
import { FindManyAlliance } from '../../../../_core/service/alliance/find/find-alliance';
import { ToastBarService } from '../../../services/toast-bar/toast-bar.service';
import { Institution } from '../../../../_core/models/institution.interface';
import { FindManyInstitution } from '../../../../_core/service/institution/find/find-institution';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-adm-add-alliance-page',
  standalone: true,
  imports: [
    HeaderSimpleComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgClass
  ],
  templateUrl: './adm-add-alliance-page.component.html',
  styleUrl: './adm-add-alliance-page.component.scss'
})
export class AdmAddAlliancePageComponent {

  val = inject(ValidatorService)
  private fb = inject(FormBuilder)  
  public xform: FormGroup<AllianceForm> = this.fb.group<AllianceForm>({
    name: new FormControl( null, ADD_INSTITUTION_NAME ),
    description: new FormControl( null, ADD_INSTITUTION_DESCRIPTION ),
  })
  
  isVal(field: string){ return this.val.isValid(this.xform, field) }
  gErr(field: string) { return this.val.getError(this.xform, field) }

  institutionId = ''
  creationDate = ''
  findInsti = new FindManyInstitution()      
  
  onFileChange(event: any) {
    this.creationDate = event.target.value
  }

  add() {
      if (
        this.xform.value.name &&
        this.xform.value.description &&
        this.institutionId &&
        this.creationDate
      ) {
        this.addAlliance.execute({
          name: this.xform.value.name,
          description: this.xform.value.description,
          institutionId: this.institutionId,
          creationDate: this.creationDate
        }).subscribe({
          next: (e: Result<CreateAllianceResponse>) => {
            if (e.IsError()) 
              this.toast.shootToast('Proceso Fallido', e.getError().message,'top', 'error')
            else 
              this.toast.shootToast('Registro Exitoso', 'Aliado registrado exitosamente','top', 'success')
          }    
        })
      }
  }
  private toast = inject(ToastBarService)
  
  insti: Institution[] = []
  ngOnInit(): void {
    this.findInsti.execute({ page: 0, perPage: 20 }).subscribe({
      next: (e: Result<Institution[]>) => {
        if ( !e.IsError() ) {
            this.insti = e.getValue()
        }
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

  addAlliance = new CreateAlliance()
}
