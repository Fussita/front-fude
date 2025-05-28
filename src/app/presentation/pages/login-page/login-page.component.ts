import { Component, inject } from '@angular/core';
import { HeaderSimpleComponent } from "../../widgets/header-simple/header-simple.component";
import { Router } from '@angular/router';
import { ToastBarService } from '../../services/toast-bar/toast-bar.service';
import { ValidatorService } from '../../services/form-validator/validator.service';
import { FormGroup, FormControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from '../../interfaces/control-forms.interface';
import { LOGIN_LOGIN_VAL, LOGIN_PASSWORD_VAL } from '../../interfaces/validators/group-validators.interface';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HeaderSimpleComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  router = inject(Router)
  toastService = inject(ToastBarService)

  val = inject(ValidatorService)
  private fb = inject(FormBuilder)  
  public loginForm: FormGroup<LoginForm> = this.fb.group<LoginForm>({
    login: new FormControl( null, LOGIN_LOGIN_VAL ),
    password: new FormControl( null, LOGIN_PASSWORD_VAL ),
  })
  
  isVal(field: string){ return this.val.isValid(this.loginForm, field) }
  gErr(field: string) { return this.val.getError(this.loginForm, field) }

  goWhere(route: string) {
    this.router.navigateByUrl(route)
  }

  shootError() {
    this.toastService.shootToast('Error', 'Ha fallado la Conexion con el Servidor', 'bottom-right', 'error')
  }

  shootSuccess() {
    this.toastService.shootToast('Completado', 'Ingreso exitoso', 'bottom-right', 'success')
  }
  
  public postRequest() {
    const log = this.loginForm.value.login
    const pas = this.loginForm.value.password
    if (log && pas && !this.gErr('login').hasValue() && !this.gErr('password').hasValue() ) {
    } else {}
  }  

}
