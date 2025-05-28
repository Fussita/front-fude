import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { Result } from "../../../_utils/result";
import { Endpoints } from "../../../constants/backend-endpoints";
import { FindAllianceEntry } from "./types/find-alliance.entry";
import { EXALLIANCE } from "../../../constants/static-data/alliance-data";
import { Alliance } from "../../../models/alliance.interface";

export class FindManyAlliance {
    
    private _http = inject(HttpClient)
    private urlBase = Endpoints.findAlli
    
    execute( entry: FindAllianceEntry ): Observable<Result<Alliance[]>>  {
        // const headers = HeaderBearerGen(token)
        let query = this.urlBase
        if (!entry.page && !entry.perPage) query += "?page=0&perPage=20"
        else if (entry.page && !entry.perPage) query += "?perPage=20&page="+entry.page
        else if (entry.perPage && !entry.page) query += "?page=0&perPage="+entry.perPage
        else query += "?page="+entry.page+"&perPage="+entry.perPage        

        if ( Endpoints.off ) {
            return new Observable<Result<Alliance[]>>(
                ob => {
                  ob.next( Result.success<Alliance[]>( EXALLIANCE ) )
                  ob.complete()
                }
              )
        }

        return this._http.get<Alliance[]>( 
            this.urlBase, 
            //{ headers } 
        ).pipe(
            map((res) => {
                return Result.success(res)
            }),
            catchError((err) => {
                return new Observable<Result<Alliance[]>>(
                    ob => {
                      ob.next( Result.fail<Alliance[]>(new Error( err.error.message )) )
                      ob.complete()
                    }
                  )
            })
        )
    }

}