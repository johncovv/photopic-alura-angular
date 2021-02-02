import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigInComponent } from './sigin.component';

describe('SiginComponent', () => {
	let component: SigInComponent;
	let fixture: ComponentFixture<SigInComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SigInComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SigInComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
