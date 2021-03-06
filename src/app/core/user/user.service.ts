import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { TokenService } from '../token/token.service';

import { IUser } from './user.d';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	// BehaviorSubject waits for someone makes a subscribe
	private userSubject = new BehaviorSubject<IUser | undefined>(undefined);
	private userName?: string;

	constructor(private tokenService: TokenService) {
		this.tokenService.hasToken() && this.decodeAndNotify();
	}

	setToken(token: string): void {
		this.tokenService.setToken(token);

		this.decodeAndNotify();
	}

	getUser(): Observable<IUser | undefined> {
		return this.userSubject.asObservable();
	}

	getUserName() {
		return this.userName;
	}

	isLogged() {
		return this.tokenService.hasToken();
	}

	logout(): void {
		this.tokenService.removeToken();
		this.userSubject.next(undefined);
	}

	private decodeAndNotify() {
		const token = this.tokenService.getToken();

		const user = jwt_decode(token) as IUser;

		this.userName = user.name;

		this.userSubject.next(user);
	}
}
