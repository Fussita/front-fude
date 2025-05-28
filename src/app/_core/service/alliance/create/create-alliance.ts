import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { Result } from "../../../_utils/result";
import { Endpoints } from "../../../constants/backend-endpoints";
import { CreateAllianceResponse } from "./types/create-alliance.response";
import { CreateAllianceEntry } from "./types/create-alliance.entry";

export class CreateAlliance {
    
    private _http = inject(HttpClient)
    private urlBase = Endpoints.createAlli
    
    execute( entry: CreateAllianceEntry ): Observable<Result<CreateAllianceResponse>>  {
        // const headers = HeaderBearerGen(token)
        return this._http.post<CreateAllianceResponse>( 
            this.urlBase,
            entry,
            //{ headers } 
        ).pipe(
            map((res) => {
                return Result.success(res)
            }),
            catchError((err) => {
                return new Observable<Result<CreateAllianceResponse>>(
                    ob => {
                      ob.next( Result.fail<CreateAllianceResponse>(new Error( err.error.message )) )
                      ob.complete()
                    }
                  )
            })
        )
    }

}