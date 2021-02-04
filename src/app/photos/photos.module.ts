import { NgModule } from '@angular/core';

// modules
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoModule } from './photo/photo.module';

@NgModule({
	imports: [PhotoModule, PhotoListModule, PhotoFormModule],
	declarations: [],
})
export class PhotosModule {}
