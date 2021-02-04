import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core/core.module';
import { ErrorsModule } from './errors/errors.module';
import { HomeModule } from './home/home.module';
import { PhotosModule } from './photos/photos.module';

// components

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		PhotosModule,
		ErrorsModule,
		CoreModule,
		HomeModule,
	],
	declarations: [AppComponent],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
