import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VMessageModule } from '../../shared/components/vmessage/vmessage.module';
import { ImmediateClickModule } from '../../shared/directives/immediate-click/immediate-click.module';
import { PhotoModule } from '../photo/photo.module';

import { PhotoFormComponent } from './photo-form.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		VMessageModule,
		PhotoModule,
		ImmediateClickModule,
		RouterModule,
	],
	declarations: [PhotoFormComponent],
})
export class PhotoFormModule {}
