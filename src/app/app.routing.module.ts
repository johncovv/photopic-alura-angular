import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedGuard } from './core/auth/authenticated.guard';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';

const routes: Routes = [
	{
		path: '',
		// load the child route module using lazy loading
		loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
	},
	{
		path: 'user/:userName',
		component: PhotoListComponent,
		resolve: {
			photos: PhotoListResolver,
		},
		data: {
			title: 'Timeline',
		},
	},
	{
		path: 'photo/add',
		component: PhotoFormComponent,
		canActivate: [AuthenticatedGuard],
		data: {
			title: 'Photo upload',
		},
	},
	{
		path: 'photo/:photoId',
		component: PhotoDetailsComponent,
		data: {
			title: 'Photo details',
		},
	},
	{
		path: 'error',
		component: GlobalErrorComponent,
		data: {
			title: 'Error',
		},
	},
	{
		path: 'not-found',
		component: NotFoundComponent,
		data: {
			title: 'Page not found',
		},
	},
	{
		path: '**',
		redirectTo: 'not-found',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
