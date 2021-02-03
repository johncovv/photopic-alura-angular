import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import jwt_decode from 'jwt-decode';

// services
import { TokenService } from '../token/token.service';

import { IUser } from './user.d';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	// BehaviorSubject waits for someone makes a subscribe
	private userSubject = new BehaviorSubject<IUser | undefined>(undefined);

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

	private decodeAndNotify() {
		const token = this.tokenService.getToken();

		const user = jwt_decode(token) as IUser;

		this.userSubject.next(user);
	}
}
