import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.less'],
	host: {
		class: 'container',
	},
})
export class NotFoundComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
