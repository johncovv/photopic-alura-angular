import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// modules
import { PhotoDetailsModule } from './photo-details/photo-details.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoModule } from './photo/photo.module';

@NgModule({
	imports: [
		CommonModule,
		PhotoModule,
		PhotoListModule,
		PhotoFormModule,
		PhotoDetailsModule,
	],
})
export class PhotosModule {}
