import {
	HttpClient,
	HttpErrorResponse,
	HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { IPhotoComment } from './photo-comment.d';
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

	findById(photoId: number): Observable<IPhoto> {
		return this.http.get<IPhoto>(`${apiUrl}/photos/${photoId}`);
	}

	removePhoto(photoId: number) {
		return this.http.delete(`${apiUrl}/photos/${photoId}`);
	}

	getComments(photoId: number): Observable<Array<IPhotoComment>> {
		return this.http.get<Array<IPhotoComment>>(
			`${apiUrl}/photos/${photoId}/comments`,
		);
	}

	addComment(photoId: number, commentText: string): Observable<IPhotoComment> {
		return this.http.post<IPhotoComment>(
			`${apiUrl}/photos/${photoId}/comments`,
			{
				commentText,
			},
			{
				observe: 'body',
			},
		);
	}

	like(photoId: number) {
		return (
			this.http
				.post(`${apiUrl}/photos/${photoId}/like`, {}, { observe: 'response' })
				// forces the return as Observable<boolean> with value true
				.pipe(map(() => true))
				// if there has an error, check if the status is 304 and return Observable<boolean> with value false
				// or continue the error
				.pipe(
					catchError((err: HttpErrorResponse) => {
						return err.status === 304 ? of(false) : throwError(err);
					}),
				)
		);
	}
}
