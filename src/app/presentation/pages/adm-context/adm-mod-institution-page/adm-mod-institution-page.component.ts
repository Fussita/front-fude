import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InstitutionForm } from '../../../interfaces/control-forms.interface';
import { MOD_INSTITUTION_DESCRIPTION, MOD_INSTITUTION_EMAIL, MOD_INSTITUTION_NAME, MOD_INSTITUTION_PHONE } from '../../../interfaces/validators/group-validators.interface';
import { ValidatorService } from '../../../services/form-validator/validator.service';
import { HeaderSimpleComponent } from '../../../widgets/header-simple/header-simple.component';
import { UpdateInstitution } from '../../../../_core/service/institution/update/update-institution';
import { Result } from '../../../../_core/_utils/result';
import { ActivatedRoute } from '@angular/router';
import { FindManyInstitution } from '../../../../_core/service/institution/find/find-institution';
import { Institution } from '../../../../_core/models/institution.interface';
import { EXINSTI } from '../../../../_core/constants/static-data/institution-data';
import { UpdateInstitutionResponse } from '../../../../_core/service/institution/update/types/update-institution.response';
import { ToastBarService } from '../../../services/toast-bar/toast-bar.service';

@Component({
  selector: 'app-adm-mod-institution-page',
  standalone: true,
  imports: [
    HeaderSimpleComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './adm-mod-institution-page.component.html',
  styleUrl: './adm-mod-institution-page.component.scss'
})
export class AdmModInstitutionPageComponent implements OnInit {
  
    constructor(private route: ActivatedRoute) {}
    currentId: string|null = ''
    
    findInsti = new FindManyInstitution()    
    val = inject(ValidatorService)
    private fb = inject(FormBuilder)  
    public xform: FormGroup<InstitutionForm> = this.fb.group<InstitutionForm>({
      email: new FormControl( null, MOD_INSTITUTION_EMAIL ),
      phone: new FormControl( null, MOD_INSTITUTION_PHONE ),
      name: new FormControl( null, MOD_INSTITUTION_NAME ),
      description: new FormControl( null, MOD_INSTITUTION_DESCRIPTION ),
    })
    
    isVal(field: string){ return this.val.isValid(this.xform, field) }
    gErr(field: string) { return this.val.getError(this.xform, field) }

    file: any = null 

    onFileChange(event: any) {
      this.file = event.target.files[0]
    } 

    mod () {
      if ( !this.currentId ) throw new Error('')
      let rt: {
        id: string
        name?: string
        description?: string
        phone?: string
        email?: string
        image?: File         
      } = { id: this.currentId }
      if (this.xform.value.name) rt = { name: this.xform.value.name, ...rt }
      if (this.xform.value.description) rt = { description: this.xform.value.description, ...rt }
      if (this.xform.value.phone) rt = { phone: this.xform.value.phone, ...rt }
      if (this.xform.value.email) rt = { email: this.xform.value.email, ...rt }
      if (this.file) rt = { image: this.file, ...rt }

      this.modInsti.execute( rt ).subscribe({
        next: (e: Result<UpdateInstitutionResponse>) => {
          if (e.IsError()) {
            this.toast.shootToast( 'Proceso Fallido', e.getError().message, 'top', 'error' )
          } else {
            this.toast.shootToast( 'Modificación Exitosa', '', 'top', 'success' )
          }
        }
      })
    }
    private toast = inject(ToastBarService)
    modInsti = new UpdateInstitution()
    insti: Institution = EXINSTI[0]
    ngOnInit() {    
      this.currentId = this.route.snapshot.paramMap.get('id')
      this.findInsti.execute({ page: 0, perPage: 20 }).subscribe({
        next: (e: Result<Institution[]>) => {
          if ( !e.IsError() ) 
            e.getValue().forEach( e => {
              if ( e.id === this.currentId ) this.insti = e
            })  
        }
      })
    }
  
}
