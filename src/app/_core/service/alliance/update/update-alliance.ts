import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { Result } from "../../../_utils/result";
import { Endpoints } from "../../../constants/backend-endpoints";
import { UpdateAllianceEntry } from "./types/update-alliance.entry";
import { UpdateAllianceResponse } from "./types/update-alliance.response";

export class UpdateAlliance {
    
    private _http = inject(HttpClient)
    private urlBase = Endpoints.updateAlli
    
    execute( entry: UpdateAllianceEntry ): Observable<Result<UpdateAllianceResponse>>  {
        // const headers = HeaderBearerGen(token)
        return this._http.patch<UpdateAllianceResponse>( 
            this.urlBase,
            entry
            //{ headers }
        ).pipe(
            map((res) => {
                return Result.success(res)
            }),
            catchError((err) => {
                return new Observable<Result<UpdateAllianceResponse>>(
                    ob => {
                      ob.next( Result.fail<UpdateAllianceResponse>(new Error( err.error.message )) )
                      ob.complete()
                    }
                  )
            })
        )
    }

}