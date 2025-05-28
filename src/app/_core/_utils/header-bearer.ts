import { HttpHeaders } from "@angular/common/http";

export function HeaderBearer( token: string ) {
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    })
}