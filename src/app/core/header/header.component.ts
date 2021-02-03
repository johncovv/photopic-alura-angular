import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// services
import { UserService } from '../user/user.service';

import { IUser } from '../user/user';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
	user$: Observable<IUser | undefined>;

	constructor(userService: UserService) {
		// save the observable
		this.user$ = userService.getUser();
	}

	ngOnInit(): void {}
}
