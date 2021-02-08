import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
		private route: ActivatedRoute,
		private photoService: PhotoService,
	) {}

	ngOnInit(): void {
		this.photoId = (this.route.snapshot.params as { photoId: number }).photoId;

		this.photo$ = this.photoService.findById(this.photoId);
	}
}
