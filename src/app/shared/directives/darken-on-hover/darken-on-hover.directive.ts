import {
	Directive,
	ElementRef,
	HostListener,
	Input,
	Renderer2,
} from '@angular/core';

@Directive({
	selector: '[appDarkenOnHover]',
})
export class DarkenOnHoverDirective {
	@Input() brightness: string = (70).toString();

	constructor(private el: ElementRef, private render: Renderer2) {}

	// decorator: on mouse over, execulte darkenOn
	@HostListener('mouseover')
	darkenOn(): void {
		this.render.setStyle(
			this.el.nativeElement,
			'filter',
			`brightness(${this.brightness}%)`,
		);
	}

	// decorator: on mouse leave, execulte darkenOff
	@HostListener('mouseleave')
	darkenOff(): void {
		this.render.setStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
	}
}
