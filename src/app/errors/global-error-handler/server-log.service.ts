import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { IServerLog } from './server-log.d';

const { serverLogUrl } = environment;

@Injectable({
	providedIn: 'root',
})
export class ServerLogService {
	constructor(private httpClient: HttpClient) {}

	log(serverLog: IServerLog): Observable<HttpResponse<Record<string, any>>> {
		return this.httpClient.post(`${serverLogUrl}/infra/log`, serverLog, {
			observe: 'response',
		});
	}
}
