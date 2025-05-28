import { Component, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SubsidiaryForm } from "../../../interfaces/control-forms.interface";
import { ADD_SUBSIDIARY_NAME, ADD_SUBSIDIARY_STATUS, ADD_SUBSIDIARY_CITY_NAME, ADD_SUBSIDIARY_STATE_NAME, ADD_SUBSIDIARY_CREATION_DATE, ADD_SUBSIDIARY_LATITUDE, ADD_SUBSIDIARY_LONGITUDE } from "../../../interfaces/validators/group-validators.interface";
import { ValidatorService } from "../../../services/form-validator/validator.service";
import { HeaderSimpleComponent } from "../../../widgets/header-simple/header-simple.component";
import { MapComponent } from "../../subsidiary-page/map-components/map.component";

@Component({
  selector: "app-add-subsidiary-page",
  templateUrl: "./add-subsidiary-page.component.html",
  styleUrl: "./add-subsidiary-page.component.scss",
  imports: [
    HeaderSimpleComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MapComponent,
  ],
  standalone: true,
})
export class AddSubsidiaryPageComponent {
  phones: {value: string, error: string | null}[] = [{value: '', error: null}];
  emails: {value: string, error: string | null}[] = [{value: '', error: null}];

  val = inject(ValidatorService)
    private fb = inject(FormBuilder)
    public xform: FormGroup<SubsidiaryForm> = this.fb.group<SubsidiaryForm>({
      name: new FormControl( null, ADD_SUBSIDIARY_NAME ),
      status: new FormControl( 'ACTIVO', ADD_SUBSIDIARY_STATUS ),
      cityName: new FormControl( null, ADD_SUBSIDIARY_CITY_NAME ),
      stateName: new FormControl( null, ADD_SUBSIDIARY_STATE_NAME ),
      creationDate: new FormControl( null, ADD_SUBSIDIARY_CREATION_DATE ),
      latitude: new FormControl( null, ADD_SUBSIDIARY_LATITUDE ),
      longitude: new FormControl( null, ADD_SUBSIDIARY_LONGITUDE )
    })

  isVal(field: string){ return this.val.isValid(this.xform, field) }
  gErr(field: string) { return this.val.getError(this.xform, field) }

  phoneRegex: RegExp = /^\d{12}$/;
  emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  addPhone(): void {
    this.phones.push({value: '', error: null});
  }

  addEmail(): void {
    this.emails.push({value: '', error: null});
  }

  removePhone(index: number): void {
    if (this.phones.length != 1) this.phones.splice(index, 1);
  }

  removeEmail(index: number): void {
    if (this.emails.length != 1) this.emails.splice(index, 1);
  }

  trackByIndex(index: number): number {
    return index;
  }

  onLocationSelected(location: { coords: L.LatLng; city: string; state: string }) {
    this.xform.patchValue({
      cityName: location.city,
      stateName: location.state,
      latitude: location.coords.lat,
      longitude: location.coords.lng
    });
  }

  onPhoneChange(value: string, index: number): void {
    // const input = event.target as HTMLInputElement;
    // const value = input.value.trim();

    if (!this.phoneRegex.test(value.trim())) {
      this.phones[index].error = 'El formato del telefono es invalido';
    }

    else if (this.phones.findIndex((phone) => phone.value === value.trim()) !== index) {
      this.phones[index].error = 'Ya ingreso este telefono';
    }

    else {
      this.phones[index].error = null;
    }

    console.log(this.phones, index);
  }

  onEmailChange(value: string, index: number): void {
    // const input = event.target as HTMLInputElement;
    // const value = input.value.trim();

    if (!this.emailRegex.test(value.trim())) {
      this.emails[index].error = 'El formato del email es invalido';
    }

    else if (this.emails.find((email) => email.value === value.trim())) {
      this.emails[index].error = 'Ya ingreso este email';
    }

    else {
      this.emails[index].error = null;
    }

    console.log(this.emails[index]);
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      const formData = {
        ...this.xform.value,
        phones: this.phones.map(phone => phone.value),
        emails: this.emails.map(email => email.value)
      };
      console.log('Form submitted:', formData);
    }
  }

  isFormValid(): boolean {
    const arePhonesValid = this.phones.every(phone => this.phoneRegex.test(phone.value.trim()) && phone.error === null);
    const areEmailsValid = this.emails.every(email => this.emailRegex.test(email.value.trim()) && email.error === null);

    return (arePhonesValid && areEmailsValid && this.xform.valid);
  }


}
