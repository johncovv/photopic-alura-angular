import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IPhoto from '../photo/photo';

import { PhotoService } from '../photo/photo.service';

@Component({
	selector: 'app-photo-list',
	templateUrl: './photo-list.component.html',
	styleUrls: ['./photo-list.component.less'],
})
export class PhotoListComponent implements OnInit {
	photos: Array<IPhoto> = [];

	constructor(
		private photoService: PhotoService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		const params = this.activatedRoute.snapshot.params as { userName: string };

		const { userName } = params;

		this.photoService.listFromUser(userName).subscribe(
			(photos) => {
				return (this.photos = photos);
			},
			(err) => {
				console.error('ERROR:', err);
			}
		);
	}
}
