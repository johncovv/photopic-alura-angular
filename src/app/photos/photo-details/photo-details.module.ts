import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VMessageModule } from '../../shared/components/vmessage/vmessage.module';
import { PhotoModule } from '../photo/photo.module';

import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import { PhotoDetailsComponent } from './photo-details.component';

@NgModule({
	imports: [
		CommonModule,
		PhotoModule,
		RouterModule,
		ReactiveFormsModule,
		VMessageModule,
	],
	declarations: [PhotoDetailsComponent, PhotoCommentsComponent],
	exports: [PhotoDetailsComponent],
})
export class PhotoDetailsModule {}
