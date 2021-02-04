import { TestBed, inject } from '@angular/core/testing';

import { SignupComponent } from './signup.component';

describe('a signup component', () => {
	let component: SignupComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SignupComponent],
		});
	});

	// instantiation through framework injection
	beforeEach(inject([SignupComponent], (SignupComponent: SignupComponent) => {
		component = SignupComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});
