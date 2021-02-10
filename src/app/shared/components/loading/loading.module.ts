import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { LoadingComponent } from './loading.component';
import { LoadingInterceptor } from './loading.interceptor';

@NgModule({
	imports: [CommonModule],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: LoadingInterceptor,
			multi: true,
		},
	],
	declarations: [LoadingComponent],
	exports: [LoadingComponent],
})
export class LoadingModule {}
