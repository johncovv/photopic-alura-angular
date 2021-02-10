import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AlertModule } from '../shared/components/alert/alert.module';
import { LoadingModule } from '../shared/components/loading/loading.module';

import { RequestInterceptor } from './auth/request.interceptor';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
	imports: [CommonModule, RouterModule, AlertModule, LoadingModule],
	declarations: [HeaderComponent, FooterComponent],
	providers: [
		{
			provide: HTTP_INTERCEPTORS, // specifies that the provider is of type HTTP_INTERCEPTORS
			useClass: RequestInterceptor, // specify the class to be executed
			multi: true, // says there can be more than one interceptor, so make it run one after the other
		},
	],
	exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
