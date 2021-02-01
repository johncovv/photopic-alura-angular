import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';

// resolvers
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';

const routes: Routes = [
	{
		path: 'user/:userName',
		component: PhotoListComponent,
		resolve: {
			photos: PhotoListResolver,
		},
	},
	{
		path: 'p/add',
		component: PhotoFormComponent,
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
