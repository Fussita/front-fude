import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { Result } from "../../../_utils/result";
import { Endpoints } from "../../../constants/backend-endpoints";
import { DeleteAllianceEntry } from "./types/delete-alliance.entry";
import { DeleteAllianceResponse } from "./types/delete-alliance.response";

export class DeleteAlliance {
    
    private _http = inject(HttpClient)
    private urlBase = Endpoints.deleteAlli
    
    execute( entry: DeleteAllianceEntry ): Observable<Result<DeleteAllianceResponse>>  {
        // const headers = HeaderBearerGen(token)
        return this._http.delete<DeleteAllianceResponse>( 
            this.urlBase, 
            {
                body: entry
            }
            //{ headers } 
        ).pipe(
            map((res) => {
                return Result.success(res)
            }),
            catchError((err) => {
                return new Observable<Result<DeleteAllianceResponse>>(
                    ob => {
                      ob.next( Result.fail<DeleteAllianceResponse>(new Error( err.error.message )) )
                      ob.complete()
                    }
                  )
            })
        )
    }

}