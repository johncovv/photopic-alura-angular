import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.less'],
})
export class SearchComponent implements OnInit, OnDestroy {
	// creates an eventEmitter to communicate on the component's own call
	@Output() handleTyping = new EventEmitter<string>();
	@Input() value: string = '';

	debounce: Subject<string> = new Subject<string>();

	constructor() {}

	ngOnInit(): void {
		// on init, create subject with debounceTime
		this.debounce
			.pipe(debounceTime(300))
			// execute the event and pass the return value
			.subscribe((filter) => this.handleTyping.emit(filter));
	}

	ngOnDestroy(): void {
		// unsubscribe from debounce(remove from memory)
		this.debounce.unsubscribe();
	}
}
