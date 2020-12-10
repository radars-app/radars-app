import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ComponentTheme } from '../common/enum/component-theme.enum';

@Component({
	selector: 'app-search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
	@Input() public theme: ComponentTheme;

	@Input() public placeholder: string;

	@Input() public preIcon: string;

	public searchInputControl: FormControl = new FormControl();
}
