import { Injectable} from '@angular/core'
import { FormGroup } from '@angular/forms'
import { WOptional } from '../../../_core/_utils/optional.utils'

@Injectable({ providedIn: 'root' })
export class ValidatorService {
  public firstNameAndLastnamePattern: string = '^[A-Za-záéíóúÁÉÍÓÚüÜ]+(?: [A-Za-záéíóúÁÉÍÓÚüÜ]+)? [A-Za-záéíóúÁÉÍÓÚüÜ]+(?: [A-Za-záéíóúÁÉÍÓÚüÜ]+)?$'
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  public passwordPattern: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+=-])\\S{8,16}$"
  public phoneNumberPattern: RegExp = /^(\(?\+58\)?\s?)?(0?4[1246]|424|414|412|416|426)?\s?\d[\d\s.-]{7,9}$/
  public numberPattern: string="\\d*"

  public firstNameAndLastnamePatternMessage: string = 'Deben ser un Nombre y un Apellido'
  public emailPatternMessage: string = "Debe ser un Email. Ex: youremail@gmail.com"
  public passwordPatternMessage: string = "Debe tener una letra mayúscula, una minúscula, un número y un caracter especial. Además de una longitud de entre 8 a 16 caracteres"
  public phoneNumberPatternMessage: string = "Debe ser 0414,0416,0412,0424,0426 Ex:04122408080"
  public numberPatternMessage:string="Debe ser un numero"
  
  public isValid(form: FormGroup, field:string){
    return form.controls[field].errors && form.controls[field].touched
  }

  public getError(form: FormGroup, field: string): WOptional<string> {
    const answer = new WOptional<string>(undefined)
    
    if (!form.controls[field] || !form.controls[field].errors) return answer
    const errors = form.controls[field].errors
    
    if(errors) {
      for (const error of Object.keys(errors)) {
        switch (error) {
        
        case 'required':
          answer.setValue('Este campo es obligatorio')
          return answer
        case 'minlength':
          answer.setValue(`Este campo debe tener minimo ${errors['minlength'].requiredLength} caracteres`)
          return answer
        case 'maxlength':
          answer.setValue(`Este campo debe tener maximo ${errors['maxlength'].requiredLength} caracteres`)
          return answer
        case 'pattern':
          answer.setValue(`Invalid pattern`)
          return answer
        }
      }
    }
    return answer
  }

}
