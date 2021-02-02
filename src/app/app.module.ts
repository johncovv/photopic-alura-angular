import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// modules
import { ErrorsModule } from './errors/errors.module';
import { AppRoutingModule } from './app.routing.module';
import { PhotosModule } from './photos/photos.module';

// components
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		PhotosModule,
		ErrorsModule,
		HomeModule,
	],
	declarations: [AppComponent],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
