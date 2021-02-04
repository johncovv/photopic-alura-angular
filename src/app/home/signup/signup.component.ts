import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import lowerCaseValidator from './../../shared/validators/lower-case.validator';
import notStartWithNumber from './../../shared/validators/not-start-with-number.validator';
import { INewUser } from './newUser.d';
import { SignupService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Component({
	selector: 'app-signup',
	templateUrl: 'signup.component.html',
	host: {
		class: 'container',
	},
})
export class SignupComponent implements OnInit {
	signupForm!: FormGroup;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private signupService: SignupService,
		private userNotTakenValidatorService: UserNotTakenValidatorService,
	) {}

	ngOnInit() {
		this.signupForm = this.formBuilder.group({
			email: ['user@mail.com', [Validators.required, Validators.email]],
			fullName: [
				'Test User',
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

	signup() {
		const newUser = this.signupForm.getRawValue() as INewUser;

		this.signupService.signup(newUser).subscribe(() => {
			this.router.navigate(['']);
		});
	}
}
