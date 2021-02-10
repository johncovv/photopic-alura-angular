import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotAuthenticatedGuard } from '../core/auth/not-authenticated.guard';

import { HomeComponent } from './home.component';
import { SignInComponent } from './sigin/sigin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [NotAuthenticatedGuard],
		children: [
			{
				path: '',
				component: SignInComponent,
				data: {
					title: 'Sign In',
				},
			},
			{
				path: 'register',
				component: SignupComponent,
				data: {
					title: 'Sign Up',
				},
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomeRoutingModule {}
