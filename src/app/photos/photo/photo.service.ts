import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import IPhoto, { IPhotoUpload } from './photo.d';

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

	upload(datas: IPhotoUpload) {
		const formData = new FormData();

		formData.append('description', datas.description);
		formData.append('allowComments', datas.allowComments ? 'true' : 'false');
		formData.append('imageFile', datas.imageFile);

		return this.http.post(`${apiUrl}/photos/upload`, formData);
	}

	findById(photoId: string): Observable<IPhoto> {
		return this.http.get<IPhoto>(`${apiUrl}/photos/${photoId}`);
	}
}
