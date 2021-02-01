import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

// types
import IPhoto from '../photo/photo';

@Component({
	selector: 'app-photo-list',
	templateUrl: './photo-list.component.html',
	styleUrls: ['./photo-list.component.less'],
})
export class PhotoListComponent implements OnInit, OnDestroy {
	photos: Array<IPhoto> = [];
	filter: string = '';
	debounce: Subject<string> = new Subject<string>();

	constructor(private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		// getting data from resolver
		this.photos = this.activatedRoute.snapshot.data.photos;

		// on init, create subject with debounceTime
		this.debounce
			.pipe(debounceTime(300))
			.subscribe((filter) => (this.filter = filter));
	}

	ngOnDestroy(): void {
		// unsubscribe from debounce(remove from memory)
		this.debounce.unsubscribe();
	}
}
