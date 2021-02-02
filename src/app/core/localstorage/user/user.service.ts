import { Injectable } from '@angular/core';

const KEY = '@Alurapic:user';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	hasUser(): boolean {
		return !!window.localStorage.getItem(KEY);
	}

	setUser(user: Record<string, any>): void {
		window.localStorage.setItem(KEY, JSON.stringify(user));
	}

	getUser(): string {
		return window.localStorage.getItem(KEY) as string;
	}

	removeUser(): void {
		return window.localStorage.removeItem(KEY);
	}
}
