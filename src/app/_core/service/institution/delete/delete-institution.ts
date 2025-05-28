import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { Result } from "../../../_utils/result";
import { Endpoints } from "../../../constants/backend-endpoints";
import { DeleteInstitutionEntry } from "./types/delete-institution.entry";
import { DeleteInstitutionResponse } from "./types/delete-institution.response";

export class DeleteInstitution {
    
    private _http = inject(HttpClient)
    private urlBase = Endpoints.deleteInsti
    
    execute( entry: DeleteInstitutionEntry ): Observable<Result<DeleteInstitutionResponse>>  {
        // const headers = HeaderBearerGen(token)
        return this._http.delete<DeleteInstitutionResponse>( 
            this.urlBase, 
            {
                body: entry
            }
            //{ headers } 
        ).pipe(
            map((res) => {
                console.log(res)
                return Result.success(res)
            }),
            catchError((err) => {
                return new Observable<Result<DeleteInstitutionResponse>>(
                    ob => {
                      ob.next( Result.fail<DeleteInstitutionResponse>(new Error( err.error.message )) )
                      ob.complete()
                    }
                  )
            })
        )
    }

}