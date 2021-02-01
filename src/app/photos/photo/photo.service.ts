import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import IPhoto from './photo.d';

@Injectable({
	providedIn: 'root',
})
export class PhotoService {
	constructor(private http: HttpClient) {}

	listFromUser(userName: string) {
		return this.http.get<Array<IPhoto>>(
			`http://localhost:3333/${userName}/photos`
		);
	}

	listFromUserPaginated(userName: string, page: number) {
		const params = new HttpParams().append('page', page.toString());

		return this.http.get<Array<IPhoto>>(
			`http://localhost:3333/${userName}/photos`,
			{
				params,
			}
		);
	}
}
