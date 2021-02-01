import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	Resolve,
	RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';

import IPhoto from '../photo/photo';

@Injectable({
	providedIn: 'root',
})
export class PhotoListResolver implements Resolve<Observable<Array<IPhoto>>> {
	constructor(private service: PhotoService) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<IPhoto[]> {
		const userName: string = route.params.userName;

		return this.service.listFromUserPaginated(userName, 1);
	}
}
