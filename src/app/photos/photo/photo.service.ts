import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import IPhoto from './photo.d';

const { apiUrl } = environment;

@Injectable({
	providedIn: 'root',
})
export class PhotoService {
	constructor(private http: HttpClient) {}

	listFromUser(userName: string): Observable<Array<IPhoto>> {
		return this.http.get<Array<IPhoto>>(`${apiUrl}/${userName}/photos`);
	}

	listFromUserPaginated(
		userName: string,
		page: number,
	): Observable<Array<IPhoto>> {
		const params = new HttpParams().append('page', page.toString());

		return this.http.get<Array<IPhoto>>(`${apiUrl}/${userName}/photos`, {
			params,
		});
	}
}
