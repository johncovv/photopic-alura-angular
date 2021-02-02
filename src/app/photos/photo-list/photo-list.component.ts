import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// types
import IPhoto from '../photo/photo';

// services
import { PhotoService } from '../photo/photo.service';

@Component({
	templateUrl: './photo-list.component.html',
	styleUrls: ['./photo-list.component.less'],
})
export class PhotoListComponent implements OnInit {
	photos: Array<IPhoto> = [];
	filter: string = '';
	hasMore: boolean = true;
	currentPage: number = 1;
	userName: string = '';

	constructor(
		private activatedRoute: ActivatedRoute,
		private photoService: PhotoService
	) {}

	ngOnInit(): void {
		this.userName = this.activatedRoute.snapshot.params.userName;

		// getting data from resolver
		this.photos = this.activatedRoute.snapshot.data.photos;
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
