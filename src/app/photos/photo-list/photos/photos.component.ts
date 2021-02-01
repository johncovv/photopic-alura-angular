import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import IPhoto from '../../photo/photo';

@Component({
	selector: 'app-photos',
	templateUrl: './photos.component.html',
	styleUrls: ['./photos.component.less'],
})
export class PhotosComponent implements OnChanges {
	@Input() photos: Array<IPhoto> = [];

	rows: Array<Array<IPhoto>> = [];

	constructor() {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.photos) this.rows = this.groupColumns(this.photos);
	}

	groupColumns(photos: Array<IPhoto>) {
		const newRows: Array<Array<IPhoto>> = [];

		for (let index = 0; index < photos.length; index += 3) {
			newRows.push(photos.slice(index, index + 3));
		}

		return newRows;
	}
}
