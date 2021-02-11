import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

import { UserService } from '../../../core/user/user.service';

@Directive({
	selector: '[appShowIfLogged]',
})
export class ShowIfLoggedDirective implements OnInit {
	private currentDisplay!: string;

	constructor(
		private element: ElementRef<HTMLElement>,
		private render: Renderer2,
		private userService: UserService,
	) {}

	ngOnInit(): void {
		this.currentDisplay = getComputedStyle(this.element.nativeElement).display;

		this.userService.getUser().subscribe((user) => {
			if (user) {
				this.render.setStyle(
					this.element.nativeElement,
					'display',
					this.currentDisplay,
				);
			} else {
				this.render.setStyle(this.element.nativeElement, 'display', 'none');
			}
		});
	}
}
