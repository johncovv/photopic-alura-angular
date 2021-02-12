import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GlobalErrorHandler } from './global-error-handler/global-error-handler';
import { GlobalErrorComponent } from './global-error/global-error.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
	imports: [CommonModule, RouterModule],
	providers: [
		{
			provide: ErrorHandler,
			useClass: GlobalErrorHandler,
		},
	],
	declarations: [NotFoundComponent, GlobalErrorComponent],
})
export class ErrorsModule {}
