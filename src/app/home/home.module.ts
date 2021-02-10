import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VMessageModule } from '../shared/components/vmessage/vmessage.module';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SignInComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SignupService } from './signup/signup.service';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		VMessageModule,
		RouterModule,
		VMessageModule,
		HomeRoutingModule,
	],
	declarations: [SignInComponent, SignupComponent, HomeComponent],
	providers: [SignupService],
})
export class HomeModule {}
