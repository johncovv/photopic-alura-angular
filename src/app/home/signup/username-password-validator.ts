import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const userNamePasswordValidator: ValidatorFn = (
	formGroup: AbstractControl,
): ValidationErrors | null => {
	const userName = (formGroup.get('userName')?.value as string).toLowerCase();
	const password = (formGroup.get('password')?.value as string).toLowerCase();

	// if inputs are not empty
	if (userName.trim() + password.trim()) {
		// if inputs are equals
		return userName !== password ? null : { userNamePassword: true };
	}

	return null;
};
