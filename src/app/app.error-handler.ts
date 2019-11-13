import { Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

export class ErrorHandler {
    
    static handleError(error: Response | any) {
        let errorMessage: string

        if(error instanceof Response) {
            errorMessage = `Error ${error.status} when trying to access the URL ${error.url} - ${error.statusText}`
        } else {
            errorMessage = error.ToString()
        }

        console.log(errorMessage)
        return Observable.throw(errorMessage)
    }
}