import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { InfoMessagesService } from "../services/messages/info-messages.service";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

    constructor(private messageService: InfoMessagesService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const reqAuthorization = req.clone({
            setHeaders: {
                Authorization: `${localStorage.getItem('token')}`
            }
        });

        return next.handle(reqAuthorization)
        .pipe(
            retry(2),
            catchError((error: HttpErrorResponse) => {
                console.log(error)
                this.messageService.showMessage({ 
                    severity: 'error', 
                    summary: 'An error has occured',
                    detail: 'It was not possible to complete the request. Please try again later.'
                });

                return throwError(error);
            })
        );
    }

}

