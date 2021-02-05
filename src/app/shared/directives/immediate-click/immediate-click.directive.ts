import { Directive, ElementRef, OnInit } from '@angular/core';

import { PlatformDetectorService } from '../../../core/platform-detector/platform.detector.service';

@Directive({
	selector: '[appImmediateClick]',
})
export class ImmediateClickDirective implements OnInit {
	constructor(
		private element: ElementRef<HTMLElement>,
		private platformDetectorService: PlatformDetectorService,
	) {}

	ngOnInit(): void {
		this.platformDetectorService.isPlatformBrowser() &&
			this.element.nativeElement.click();
	}
}
