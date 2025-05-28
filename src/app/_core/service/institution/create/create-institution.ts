import { HttpClient } from "@angular/common/http";
import { CreateInstitutionEntry } from "./types/create-institution.entry";
import { CreateInstitutionResponse } from "./types/create-institution.response";
import { inject } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { Result } from "../../../_utils/result";
import { Endpoints } from "../../../constants/backend-endpoints";

export class CreateInstitution {
    
    private _http = inject(HttpClient)
    private urlBase = Endpoints.createInsti
    
    execute( entry: CreateInstitutionEntry ): Observable<Result<CreateInstitutionResponse>>  {
        // const headers = HeaderBearerGen(token)
        const formData = new FormData()
        formData.append('name', entry.name)
        formData.append('phone', entry.phone)
        formData.append('email', entry.email)
        formData.append('description', entry.description)
        formData.append('image', entry.image)
        return this._http.post<CreateInstitutionResponse>( 
            this.urlBase,
            formData
            //{ headers } 
        ).pipe(
            map((res) => {
                return Result.success(res)
            }),
            catchError((err) => {
                return new Observable<Result<CreateInstitutionResponse>>(
                    ob => {
                      ob.next( Result.fail<CreateInstitutionResponse>(new Error( err.error.message )) )
                      ob.complete()
                    }
                  )
            })
        )
    }

}