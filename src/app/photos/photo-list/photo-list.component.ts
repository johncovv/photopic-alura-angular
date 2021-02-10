import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import IPhoto from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
	templateUrl: './photo-list.component.html',
	styleUrls: ['./photo-list.component.less'],
	host: {
		class: 'mx-auto',
	},
})
export class PhotoListComponent implements OnInit {
	photos: Array<IPhoto> = [];
	filter: string = '';
	hasMore: boolean = true;
	currentPage: number = 1;
	userName: string = '';

	constructor(
		private activatedRoute: ActivatedRoute,
		private photoService: PhotoService,
	) {}

	ngOnInit(): void {
		// execute the script every time the route parameters change
		this.activatedRoute.params.subscribe((params) => {
			this.userName = params.userName as string;

			// getting data from resolver
			this.photos = this.activatedRoute.snapshot.data.photos;
		});
	}

	load(): void {
		this.photoService
			.listFromUserPaginated(this.userName, ++this.currentPage)
			.subscribe((photos) => {
				this.filter = '';
				this.photos = this.photos.concat(photos);

				if (!photos.length) this.hasMore = false;
			});
	}
}
