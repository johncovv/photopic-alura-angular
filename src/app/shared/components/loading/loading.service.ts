import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { LoadingType } from './loading';

@Injectable({
	providedIn: 'root',
})
export class LoadingService {
	loadingSubject: Subject<LoadingType> = new Subject<LoadingType>();

	getLoading(): Observable<LoadingType> {
		// returns the subject as observable, with the initial value being LoadingType.STOPPED
		return this.loadingSubject
			.asObservable()
			.pipe(startWith(LoadingType.STOPPED));
	}

	start(): void {
		this.loadingSubject.next(LoadingType.LOADING);
	}

	stop(): void {
		this.loadingSubject.next(LoadingType.STOPPED);
	}
}
