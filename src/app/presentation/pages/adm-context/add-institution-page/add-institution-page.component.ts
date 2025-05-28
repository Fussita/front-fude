import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InstitutionForm } from '../../../interfaces/control-forms.interface';
import { ValidatorService } from '../../../services/form-validator/validator.service';
import { HeaderSimpleComponent } from '../../../widgets/header-simple/header-simple.component';
import { ADD_INSTITUTION_EMAIL, ADD_INSTITUTION_PHONE, ADD_INSTITUTION_NAME, ADD_INSTITUTION_DESCRIPTION } from '../../../interfaces/validators/group-validators.interface';
import { CreateInstitution } from '../../../../_core/service/institution/create/create-institution';
import { Result } from '../../../../_core/_utils/result';
import { CreateInstitutionResponse } from '../../../../_core/service/institution/create/types/create-institution.response';
import { ToastBarService } from '../../../services/toast-bar/toast-bar.service';

@Component({
  selector: 'app-add-institution-page',
  standalone: true,
  imports: [
    HeaderSimpleComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './add-institution-page.component.html',
  styleUrl: './add-institution-page.component.scss'
})
export class AddInstitutionPageComponent {

  val = inject(ValidatorService)
  private fb = inject(FormBuilder) 
  private toast = inject(ToastBarService)
  file: any = null 
  public xform: FormGroup<InstitutionForm> = this.fb.group<InstitutionForm>({
    email: new FormControl( null, ADD_INSTITUTION_EMAIL ),
    phone: new FormControl( null, ADD_INSTITUTION_PHONE ),
    name: new FormControl( null, ADD_INSTITUTION_NAME ),
    description: new FormControl( null, ADD_INSTITUTION_DESCRIPTION ),
  })

  onFileChange(event: any) {
    this.file = event.target.files[0]
  }
  
  isVal(field: string){ return this.val.isValid(this.xform, field) }
  gErr(field: string) { return this.val.getError(this.xform, field) }

  add() {
    if (
      this.xform.value.email &&
      this.xform.value.phone &&
      this.xform.value.name &&
      this.xform.value.description &&
      this.file
    ) {
      this.addInsti.execute({
        name: this.xform.value.name,
        description: this.xform.value.description,
        phone: this.xform.value.phone,
        email: this.xform.value.email,
        image: this.file,
      }).subscribe({
        next: (e: Result<CreateInstitutionResponse>) => {
          if (e.IsError())
            this.toast.shootToast('Proceso Fallido', e.getError().message,'top', 'error')
          else 
            this.toast.shootToast('Registro Exitoso', 'Institución registrada exitosamente', 'top', 'success' )
        }
      })
    }
  }

  addInsti = new CreateInstitution()

}
