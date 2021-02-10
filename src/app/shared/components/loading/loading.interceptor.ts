import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoadingService } from './loading.service';

@Injectable({
	providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
	constructor(private loadingService: LoadingService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		// returns the request, but passing a tap function before everyone subscribe
		return next.handle(req).pipe(
			tap((event) => {
				// if the request event is an http response (completed), stop the loading
				if (event instanceof HttpResponse) {
					this.loadingService.stop();
					// if not, start the loading
				} else {
					this.loadingService.start();
				}
			}),
		);
	}
}
