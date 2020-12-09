import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { ComponentTheme } from '../common/enum/component-theme.enum';
import { InputComponent } from '../input/input.component';

@Component({
	selector: 'app-search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
	@ViewChild('searchInput', { static: true })
	public readonly searchInput: InputComponent;

	@Input() public theme: ComponentTheme;

	@Input() public label: string;

	@Input() public placeholder: string;

	@Input() public preIcon: string;

	@Input() public foundItems$: Subject<any[]>;

	public value: string;

	public setValue(eventString: string): void {
		console.log('search input', eventString);
		this.value = eventString.trim();
	}

	public setInnerValue(value: string): void {
		console.log('setInnerValue', value);
		this.searchInput.onValueInput(value);
	}
}
