import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import * as StackTrace from 'stacktrace-js';

import { environment } from '../../../environments/environment';
import { UserService } from '../../core/user/user.service';

import { ServerLogService } from './server-log.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	/*
	 * There is one problem though, since error handling is really important it needs to be loaded first,
	 * this making it not possible to use dependency injection in the constructor to get other services
	 * such as the error handle api service to send the server our error details. As a result, we have
	 * to manually call the injector with the service name in the execution of the handleError function
	 */
	constructor(private injector: Injector) {}

	handleError(error: any): void {
		// manual dependency injectors
		const location = this.injector.get(LocationStrategy);
		const userService = this.injector.get(UserService);
		const serverLogService = this.injector.get(ServerLogService);
		const router = this.injector.get(Router);

		const userName = userService.getUserName() || 'NOT-LOGGED';

		const date = new Date().toISOString();

		const locationPath =
			location instanceof PathLocationStrategy
				? location.path()
				: 'UNKNOWN-LOCATION-PATH';

		environment.production && router.navigate(['/error']);

		StackTrace.fromError(error).then((stackFrames) => {
			const stackAsString = stackFrames.map((sf) => sf.toString()).join('\n');
			const message = error.message ? error.message : error.toString();

			// local error log
			console.error(message);
			console.error(stackAsString);

			// sending error log to the server
			serverLogService
				.log({ message, date, locationPath, userName, stackAsString })
				.subscribe(
					() => console.info('✅ Error logged on server!'),
					(err) => console.error('ERROR SENDING ERROR LOG TO SERVER:', err),
				);
		});
	}
}
