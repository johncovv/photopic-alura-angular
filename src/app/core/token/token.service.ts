import { Injectable } from '@angular/core';

const KEY = '@Alurapic:auth';

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	hasToken(): boolean {
		return !!window.localStorage.getItem(KEY);
	}

	setToken(token: string): void {
		window.localStorage.setItem(KEY, token);
	}

	getToken(): string {
		return window.localStorage.getItem(KEY) as string;
	}

	removeToken(): void {
		return window.localStorage.removeItem(KEY);
	}
}
