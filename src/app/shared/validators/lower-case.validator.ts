import { AbstractControl } from '@angular/forms';

export default (control: AbstractControl): { lowerCase: boolean } | null => {
	if (control.value.trim() && !/^[a-z0-9]+$/.test(control.value)) {
		return { lowerCase: true };
	}

	return null;
};
