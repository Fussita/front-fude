import { FormArray, FormControl } from "@angular/forms"

export interface LoginForm {
    login: FormControl<string | null>
    password: FormControl<string| null>
}

export interface InstitutionForm {
    name: FormControl<string | null>
    description: FormControl<string| null>
    phone: FormControl<string| null>
    email: FormControl<string| null>   
}

export interface AllianceForm {
    name: FormControl<string | null>
    description: FormControl<string| null>
}

export interface SubsidiaryForm {
    name: FormControl<string | null>
    cityName: FormControl<string| null>
    stateName: FormControl<string| null>
    longitude: FormControl<number | null>
    latitude: FormControl<number | null>
    creationDate: FormControl<Date | null>
    status: FormControl<string | null>
}


