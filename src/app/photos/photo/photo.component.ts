import { Component, Input } from '@angular/core';

import { environment } from '../../../environments/environment';

const { apiUrl } = environment;

const cloud = `${apiUrl}/imgs`;

@Component({
	selector: 'app-photo',
	templateUrl: './photo.component.html',
	styleUrls: ['./photo.component.less'],
})
export class PhotoComponent {
	private _url = '';

	// eslint-disable-next-line @typescript-eslint/member-ordering
	@Input() description = '';
	@Input() set url(url: string) {
		this._url = url.startsWith('data') ? url : `${cloud}/${url}`;
	}

	get url() {
		return this._url;
	}
}
