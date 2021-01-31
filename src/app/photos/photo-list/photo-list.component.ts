import { Component, OnInit } from '@angular/core';

import { PhotoService } from '../photo/photo.service';

@Component({
	selector: 'app-photo-list',
	templateUrl: './photo-list.component.html',
	styleUrls: ['./photo-list.component.less'],
})
export class PhotoListComponent implements OnInit {
	photos = [] as Array<{ url: string; description: string }>;

	constructor(private photoService: PhotoService) {}

	ngOnInit(): void {
		this.photoService.listFromUser('flavio').subscribe((photos) => {
			return (this.photos = photos);
		});
	}
}
