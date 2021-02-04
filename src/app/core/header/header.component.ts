import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IUser } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
	user$: Observable<IUser | undefined>;

	constructor(private userService: UserService, private router: Router) {
		// save the observable
		this.user$ = userService.getUser();
	}

	logout(): void {
		this.userService.logout();
		this.router.navigate(['']);
	}

	ngOnInit(): void {}
}
