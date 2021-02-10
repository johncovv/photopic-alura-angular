import { Directive, ElementRef, OnInit } from '@angular/core';

import { UserService } from '../../../core/user/user.service';

@Directive({
	selector: '[appShowIfLogged]',
})
export class ShowIfLoggedDirective implements OnInit {
	constructor(
		private element: ElementRef<HTMLElement>,
		private userService: UserService,
	) {}

	ngOnInit(): void {
		!this.userService.isLogged() && this.element.nativeElement.remove();
	}
}
