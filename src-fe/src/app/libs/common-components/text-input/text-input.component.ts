import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { AutoCompleteOption } from './model/auto-complete-option';

@Component({
	selector: 'app-text-input',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements AfterViewInit, OnChanges {
	@Input()
	public theme: ComponentTheme;

	@Input()
	public autoCompleteOptions: AutoCompleteOption[];

	@Input()
	public isAutoCompleteEnabled: boolean;

	@Input()
	public placeholder: string;

	@Input()
	public preIcon: string;

	@Input()
	public resetable: boolean;

	@Input()
	public label: string;

	@Input()
	public required: boolean;

	@Input()
	public disabled: boolean;

	@Input()
	public value: any;

	@Output()
	public autoCompleteOptionSelected: EventEmitter<AutoCompleteOption> = new EventEmitter<AutoCompleteOption>();

	@Output()
	public valueChange: EventEmitter<any> = new EventEmitter<any>();

	@Output()
	public valueUpdated: EventEmitter<any> = new EventEmitter<any>();

	public inputControl: FormControl = new FormControl();

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public get hasIcon(): boolean {
		return Boolean(this.preIcon);
	}

	public get labeled(): boolean {
		return Boolean(this.label);
	}

	constructor() {}

	public selectAutoCompleteOption(event: MatAutocompleteSelectedEvent): void {
		this.valueChange.next(event.option.value.label);
		this.autoCompleteOptionSelected.next(event.option.value);
	}

	public ngAfterViewInit(): void {
		setTimeout(() => {
			if (Boolean(this.value)) {
				this.inputControl.setValue(this.value);
			}
		}, 0);
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.value) {
			this.inputControl.setValue(this.value);
		}
	}

	public reset(): void {
		this.valueChange.next('');
		this.inputControl.setValue('');
		this.autoCompleteOptions = [];
	}

	public mapOption(value: AutoCompleteOption): string {
		if (typeof value === 'string') {
			return value;
		} else {
			return value?.label;
		}
	}
}
