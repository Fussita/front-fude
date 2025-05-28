import { Observable } from "rxjs"
import { Result } from "./result"

export function RObservableError<T>( err: string ) {
    return new Observable<Result<T>>(
      ob => {
        ob.next( Result.fail<T>( new Error( err ) ) )
        ob.complete()
      }
    )
  }