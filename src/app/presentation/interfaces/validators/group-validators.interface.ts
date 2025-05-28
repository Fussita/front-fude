import { Validators } from "@angular/forms";
import { ValidatorService } from "../../services/form-validator/validator.service";

const val = new ValidatorService()

export const LOGIN_LOGIN_VAL = {
    nonNullable: true,
    validators: [
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.required
    ]
}

export const LOGIN_PASSWORD_VAL = {
    nonNullable: true,
    validators: [
        Validators.minLength(2),
        Validators.maxLength(32),
        Validators.required
    ]
}

export const ADD_INSTITUTION_NAME = {
    nonNullable: true,
    validators: [
        Validators.minLength(2),
        Validators.maxLength(32),
        Validators.required
    ]
}

export const ADD_INSTITUTION_DESCRIPTION = {
    nonNullable: true,
    validators: [
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.required
    ]
}

export const ADD_INSTITUTION_PHONE = {
    nonNullable: true,
    validators: [
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.required
    ]
}

export const MOD_INSTITUTION_NAME = {
    nonNullable: false,
    validators: [
        Validators.minLength(2),
        Validators.maxLength(32),
        Validators.required
    ]
}

export const MOD_INSTITUTION_DESCRIPTION = {
    nonNullable: false,
    validators: [
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.required
    ]
}

export const MOD_INSTITUTION_PHONE = {
    nonNullable: false,
    validators: [
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.required
    ]
}

export const ADD_INSTITUTION_EMAIL = {
    nonNullable: true,
    validators: [
        Validators.minLength(4),
        Validators.maxLength(32),
        Validators.required
    ]
}

export const MOD_INSTITUTION_EMAIL = {
    nonNullable: false,
    validators: [
        Validators.minLength(4),
        Validators.maxLength(32),
        Validators.required
    ]
}


export const ADD_SUBSIDIARY_EMAIL = {
    nonNullable: true,
    validators: [
        Validators.minLength(4),
        Validators.maxLength(32),
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        Validators.required
    ]
}

export const ADD_SUBSIDIARY_PHONE = {
  nonNullable: true,
  validators: [
      Validators.minLength(6),
      Validators.maxLength(12),
      Validators.required
  ]
}

export const ADD_SUBSIDIARY_NAME = {
  nonNullable: true,
  validators: [
      Validators.minLength(2),
      Validators.maxLength(32),
      Validators.required
  ]
}

export const ADD_SUBSIDIARY_STATUS = {
  nonNullable: true,
  validators: [
      Validators.pattern(/^(ACTIVO|INACTIVO)$/),
      Validators.required
  ]
}

export const ADD_SUBSIDIARY_CITY_NAME = {
  nonNullable: true,
  validators: [
      Validators.minLength(1),
      Validators.maxLength(60),
      Validators.required
  ]
}

export const ADD_SUBSIDIARY_STATE_NAME = {
  nonNullable: true,
  validators: [
      Validators.minLength(1),
      Validators.maxLength(60),
      Validators.required
  ]
}

export const ADD_SUBSIDIARY_CREATION_DATE = {
  nonNullable: true,
  validators: [
      Validators.required
  ]
}

export const ADD_SUBSIDIARY_LATITUDE = {
  nonNullable: true,
  validators: [
      Validators.min(-90),
      Validators.max(90),
      Validators.required
  ]
}

export const ADD_SUBSIDIARY_LONGITUDE = {
  nonNullable: true,
  validators: [
      Validators.min(-180),
      Validators.max(180),
      Validators.required
  ]
}
