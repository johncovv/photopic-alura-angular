import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { SigInComponent } from './sigin/sigin.component';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, VMessageModule, RouterModule],
	declarations: [SigInComponent],
})
export class HomeModule {}
