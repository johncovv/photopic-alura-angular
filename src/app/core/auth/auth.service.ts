import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { IUser } from '../user/user';
import { UserService } from '../user/user.service';

const { apiUrl } = environment;

interface IHttpUserResponse extends HttpResponse<Record<string, any>> {
	body: IUser;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient, private userService: UserService) {}

	authenticate(
		userName: string,
		password: string,
	): Observable<IHttpUserResponse> {
		return (this.http
			.post<IHttpUserResponse>(
				`${apiUrl}/user/login`,
				{
					userName,
					password,
				},
				{
					observe: 'response',
				},
			)
			.pipe(
				tap((res) => {
					const authToken = res.headers.get('x-access-token') as string;

					this.userService.setToken(authToken);

					console.log(`User ${userName} authenticated with token ${authToken}`);
				}),
			) as unknown) as Observable<IHttpUserResponse>;
	}
}
