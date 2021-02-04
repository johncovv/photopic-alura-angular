import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { INewUser } from './newUser.d';

const { apiUrl } = environment;

@Injectable({
	providedIn: 'root',
})
export class SignupService {
	constructor(private http: HttpClient) {}

	async checkUserNameTaken(userName: string): Promise<boolean> {
		return await this.http
			.get<boolean>(`${apiUrl}/user/exists/${userName}`, {
				observe: 'body',
			})
			.pipe(take(1))
			.toPromise();
	}

	signup(newUser: INewUser) {
		return this.http.post<INewUser>(`${apiUrl}/user/signup`, newUser, {
			observe: 'body',
		});
	}
}
