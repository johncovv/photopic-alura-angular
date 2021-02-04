import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VMessageModule } from '../shared/components/vmessage/vmessage.module';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SigInComponent } from './sigin/sigin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		VMessageModule,
		RouterModule,
		VMessageModule,
		HomeRoutingModule,
	],
	declarations: [SigInComponent, SignupComponent, HomeComponent],
})
export class HomeModule {}
