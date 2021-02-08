import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import IPhoto from '../photo/photo';
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
	) {}

	ngOnInit(): void {
		this.photoId = (this.route.snapshot.params as { photoId: number }).photoId;

		this.photo$ = this.photoService.findById(this.photoId);
	}

	remove(): void {
		const allowRemove = window.confirm(
			'Do you really want to delete this photo?',
		);

		if (allowRemove) {
			this.photoService.removePhoto(this.photoId).subscribe(
				() => {
					this.router.navigate(['/']);
				},
				(err) => console.error('DELETE PHOTO ERROR: ', err),
			);
		}
	}
}
