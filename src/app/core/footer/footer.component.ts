import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser } from '../user/user.d';
import { UserService } from '../user/user.service';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.less'],
})
export class FooterComponent {
	user$: Observable<IUser | undefined>;

	constructor(private userService: UserService) {
		this.user$ = this.userService.getUser();
	}
}
