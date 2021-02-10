import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { UserService } from '../../../core/user/user.service';
import IPhoto from '../../photo/photo.d';

@Directive({
	selector: '[appPhotoOwnerOnly]',
})
export class PhotoOwnerOnlyDirective implements OnInit {
	@Input() ownedPhoto!: IPhoto;

	constructor(
		private element: ElementRef<HTMLElement>,
		private userService: UserService,
	) {}

	ngOnInit(): void {
		this.userService.getUser().subscribe((user) => {
			(!user || user.id !== this.ownedPhoto.userId) &&
				this.element.nativeElement.remove();
		});
	}
}
