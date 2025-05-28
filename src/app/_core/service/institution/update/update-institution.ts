import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { Result } from "../../../_utils/result";
import { Endpoints } from "../../../constants/backend-endpoints";
import { UpdateInstitutionEntry } from "./types/update-institution.entry";
import { UpdateInstitutionResponse } from "./types/update-institution.response";

export class UpdateInstitution {
    
    private _http = inject(HttpClient)
    private urlBase = Endpoints.updateInsti
    
    execute( entry: UpdateInstitutionEntry ): Observable<Result<UpdateInstitutionResponse>>  {
        // const headers = HeaderBearerGen(token)
        const formData = new FormData()
        if (entry.name) formData.append('id', entry.id)
        if (entry.name) formData.append('name', entry.name)
        if (entry.phone) formData.append('phone', entry.phone)
        if (entry.email) formData.append('email', entry.email)
        if (entry.description) formData.append('description', entry.description)
        if (entry.image) formData.append('image', entry.image)
        return this._http.patch<UpdateInstitutionResponse>( 
            this.urlBase,
            formData
            //{ headers } 
        ).pipe(
            map((res) => {
                return Result.success(res)
            }),
            catchError((err) => {
                return new Observable<Result<UpdateInstitutionResponse>>(
                    ob => {
                      ob.next( Result.fail<UpdateInstitutionResponse>(new Error( err.error.message )) )
                      ob.complete()
                    }
                  )
            })
        )
    }

}