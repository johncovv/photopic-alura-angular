import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PlatformDetectorService } from '../../core/platform-detector/platform.detector.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import lowerCaseValidator from '../../shared/validators/lower-case.validator';
import notStartWithNumber from '../../shared/validators/not-start-with-number.validator';

import { INewUser } from './newUser.d';
import { SignupService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Component({
	selector: 'app-signup',
	templateUrl: 'signup.component.html',
	providers: [UserNotTakenValidatorService],
})
export class SignupComponent implements OnInit, AfterViewInit {
	@ViewChild('inputEmail') inputEmail!: ElementRef<HTMLInputElement>;
	signupForm!: FormGroup;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private signupService: SignupService,
		private userNotTakenValidatorService: UserNotTakenValidatorService,
		private platformDetectorService: PlatformDetectorService,
		private alertService: AlertService,
	) {}

	ngOnInit() {
		this.signupForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			fullName: [
				'',
				[
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(40),
				],
			],
			userName: [
				'',
				[
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(14),
					lowerCaseValidator,
					notStartWithNumber,
				],
				this.userNotTakenValidatorService.checkUserNameTaken(),
			],
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(5),
					Validators.maxLength(24),
				],
			],
		});
	}

	ngAfterViewInit(): void {
		this.platformDetectorService.isPlatformBrowser() &&
			this.inputEmail.nativeElement.focus();
	}

	signup() {
		const newUser = this.signupForm.getRawValue() as INewUser;

		this.signupService.signup(newUser).subscribe(
			() => {
				this.alertService.success('User successfully registered!', true);
				this.router.navigate(['/']);
			},
			(err) => {
				console.error('SIGNUP ERROR:', err);
				this.alertService.warning(
					'Error when trying to register a user, try again later!',
				);
			},
		);
	}
}
