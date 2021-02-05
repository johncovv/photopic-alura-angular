import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenService } from '../token/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
	constructor(private tokenService: TokenService) {}

	// intercept all requests
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		// check if has token
		if (this.tokenService.hasToken()) {
			const token = this.tokenService.getToken();

			// clone the request, but now setting a header
			req = req.clone({
				setHeaders: {
					'x-access-token': token,
				},
			});
		}

		// return the request
		return next.handle(req);
	}
}
