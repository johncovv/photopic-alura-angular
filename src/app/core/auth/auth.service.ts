import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

// services
import { TokenService } from '../localstorage/token/token.service';
import { UserService } from '../localstorage/user/user.service';

interface IResponseUser {
	id: number;
	name: string;
	email: string;
}

interface IHttpUserResponse extends HttpResponse<Record<string, any>> {
	body: IResponseUser;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	apiUrl: string = environment.apiUrl;

	constructor(
		private http: HttpClient,
		private tokenService: TokenService,
		private userService: UserService
	) {}

	authenticate(
		userName: string,
		password: string
	): Observable<IHttpUserResponse> {
		return (this.http
			.post<IHttpUserResponse>(
				`${this.apiUrl}/user/login`,
				{
					userName,
					password,
				},
				{
					observe: 'response',
				}
			)
			.pipe(
				tap((res) => {
					const user = (res.body as unknown) as IResponseUser;
					const authToken = res.headers.get('x-access-token') as string;

					this.tokenService.setToken(authToken);
					this.userService.setUser(user);

					console.log(
						`User ${user.name} authenticated with token ${authToken}`
					);
				})
			) as unknown) as Observable<IHttpUserResponse>;
	}
}
