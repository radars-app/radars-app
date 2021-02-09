import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MsalService } from '@azure/msal-angular';

@Injectable()
export class AuthRedirectInterceptor implements HttpInterceptor {
	constructor(private msalService: MsalService) {}

	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				const unauthorizedErrorCode: number = 401;
				if (error.status === unauthorizedErrorCode) {
					setTimeout(() => this.msalService.loginRedirect());
				}
				return throwError(error.message);
			})
		);
	}
}
