import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VMessageModule } from '../shared/components/vmessage/vmessage.module';

import { SigInComponent } from './sigin/sigin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		VMessageModule,
		RouterModule,
		VMessageModule,
	],
	declarations: [SigInComponent, SignupComponent],
})
export class HomeModule {}
