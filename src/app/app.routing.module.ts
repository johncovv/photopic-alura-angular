import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedGuard } from './core/auth/authenticated.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
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
	},
	{
		path: 'photo/add',
		component: PhotoFormComponent,
		canActivate: [AuthenticatedGuard],
	},
	{
		path: '**',
		component: NotFoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
