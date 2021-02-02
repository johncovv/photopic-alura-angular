import { Pipe, PipeTransform } from '@angular/core';

import IPhoto from '../photo/photo';

@Pipe({
	name: 'filterByDescription',
})
export class FilterByDescription implements PipeTransform {
	transform(photos: Array<IPhoto>, descriptionQuery: string) {
		descriptionQuery = descriptionQuery.trim().toLowerCase();

		if (!descriptionQuery) {
			return photos;
		} else {
			return photos.filter((photo) =>
				photo.description.toLowerCase().includes(descriptionQuery),
			);
		}
	}
}
