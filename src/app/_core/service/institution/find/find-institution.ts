import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, map, catchError } from "rxjs";
import { Result } from "../../../_utils/result";
import { Endpoints } from "../../../constants/backend-endpoints";
import { FindInstitutionEntry } from "./types/find-institution.entry";
import { Institution } from "../../../models/institution.interface";
import { EXINSTI } from "../../../constants/static-data/institution-data";

export class FindManyInstitution {
    
    private _http = inject(HttpClient)
    private urlBase = Endpoints.findInsti
    
    execute( entry: FindInstitutionEntry ): Observable<Result<Institution[]>>  {
        // const headers = HeaderBearerGen(token)
        let query = this.urlBase
        if (!entry.page && !entry.perPage) query += "?page=0&perPage=20"
        else if (entry.page && !entry.perPage) query += "?perPage=20&page="+entry.page
        else if (entry.perPage && !entry.page) query += "?page=0&perPage="+entry.perPage
        else query += "?page="+entry.page+"&perPage="+entry.perPage        

        if ( Endpoints.off ) {
            return new Observable<Result<Institution[]>>(
                ob => {
                  ob.next( Result.success<Institution[]>( EXINSTI ) )
                  ob.complete()
                }
              )
        }

        return this._http.get<Institution[]>( 
            this.urlBase, 
            //{ headers } 
        ).pipe(
            map((res) => {
                return Result.success( res )
            }),
            catchError((err) => {
                return new Observable<Result<Institution[]>>(
                    ob => {
                      ob.next( Result.fail<Institution[]>(new Error( err.error.message )) )
                      ob.complete()
                    }
                  )
            })
        )
    }

}