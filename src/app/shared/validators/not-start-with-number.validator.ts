import { AbstractControl } from '@angular/forms';

export default (
	control: AbstractControl,
): { notStartWithNumber: boolean } | null => {
	if (control.value.trim() && !/^(?![0-9_])\w+$/.test(control.value)) {
		return { notStartWithNumber: true };
	}

	return null;
};
