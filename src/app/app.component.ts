import { Component, OnInit, Pipe } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private titleService: Title,
	) {}

	ngOnInit(): void {
		this.router.events
			// if the event is the end of a navigation
			.pipe(filter((event) => event instanceof NavigationEnd))
			// the return value will be the ActivatedRoute
			.pipe(map(() => this.activatedRoute))
			.pipe(
				// go up the hierarchy and take the active route
				map((route) => {
					while (route.firstChild) route = route.firstChild;
					return route;
				}),
			)
			// change the return value to be the route data
			.pipe(switchMap((route) => route.data))
			// set the page title to be the value registered on the route
			.subscribe((page) => this.titleService.setTitle(page.title));
	}
}
