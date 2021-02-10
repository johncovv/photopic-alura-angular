import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../../core/user/user.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import IPhoto from '../photo/photo.d';
import { PhotoService } from '../photo/photo.service';

@Component({
	selector: 'app-photo-details',
	templateUrl: './photo-details.component.html',
	styleUrls: ['./photo-details.component.less'],
	host: {
		class: 'container',
	},
})
export class PhotoDetailsComponent implements OnInit {
	photo$?: Observable<IPhoto>;
	photoId!: number;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private photoService: PhotoService,
		private alertService: AlertService,
		private userService: UserService,
	) {}

	ngOnInit(): void {
		this.photoId = (this.route.snapshot.params as { photoId: number }).photoId;

		this.photo$ = this.photoService.findById(this.photoId);

		this.photo$.subscribe(
			() => {},
			(err) => {
				console.error('PHOTO NOT FOUND:', err);
				this.router.navigate(['/not-found']);
			},
		);
	}

	like(photo: IPhoto): void {
		this.photoService.like(photo.id).subscribe(
			(liked) => {
				if (liked) {
					this.photo$ = this.photoService.findById(photo.id);
					this.alertService.success('Photo successfully liked!');
				}
			},
			(err) => {
				this.alertService.danger('Error on trying to like, try again later!');
				console.error('ERROR LIKE PHOTO:', err);
			},
		);
	}

	remove(): void {
		const allowRemove = window.confirm(
			'Do you really want to delete this photo?',
		);

		if (allowRemove) {
			this.photoService.removePhoto(this.photoId).subscribe(
				() => {
					this.alertService.success('Photo removed!', true);
					this.router.navigate(['/user', this.userService.getUserName()]);
				},
				(err) => {
					this.alertService.warning('Could not delete the photo!', true);
					console.error('DELETE PHOTO ERROR: ', err);
				},
			);
		}
	}
}
