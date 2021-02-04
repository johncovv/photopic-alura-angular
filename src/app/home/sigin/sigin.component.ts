import {
	Component,
	ElementRef,
	OnInit,
	ViewChild,
	AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { PlatformDetectorService } from '../../core/platform-detector/platform.detector.service';

@Component({
	templateUrl: './sigin.component.html',
	styleUrls: ['./sigin.component.less'],
})
export class SigInComponent implements OnInit, AfterViewInit {
	@ViewChild('userNameInput') userName!: ElementRef<HTMLInputElement>;
	loginForm!: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private platformDetectorService: PlatformDetectorService,
	) {}

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			userName: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	ngAfterViewInit(): void {
		this.platformDetectorService.isPlatformBrowser() &&
			this.userName.nativeElement.focus();
	}

	signIn(): void {
		const userName = this.loginForm.get('userName')?.value as string;
		const password = this.loginForm.get('password')?.value as string;

		this.authService.authenticate(userName, password).subscribe(
			(user) => {
				const { name } = user.body;

				// navigate to user page
				this.router.navigate(['user', name]);
			},
			(err) => {
				console.error('ERROR:', err);

				// reset data for all form fields
				this.loginForm.reset();

				// if the platform is browser, execute the next command
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				this.platformDetectorService.isPlatformBrowser() &&
					this.userName.nativeElement.focus();

				alert('Invalid user name or password!');
			},
		);
	}
}
