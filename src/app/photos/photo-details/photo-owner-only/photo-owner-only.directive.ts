import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

import { UserService } from '../../../core/user/user.service';
import IPhoto from '../../photo/photo.d';

@Directive({
	selector: '[appPhotoOwnerOnly]',
})
export class PhotoOwnerOnlyDirective implements OnInit {
	@Input() ownedPhoto!: IPhoto;

	constructor(
		private element: ElementRef<HTMLElement>,
		private renderer: Renderer2,
		private userService: UserService,
	) {}

	ngOnInit(): void {
		this.userService.getUser().subscribe((user) => {
			if (!user || user.id !== this.ownedPhoto.userId) {
				this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
			}
		});
	}
}
