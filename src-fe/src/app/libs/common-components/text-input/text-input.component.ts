import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ComponentTheme } from '../common/enum/component-theme.enum';

@Component({
	selector: 'app-text-input',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements AfterViewInit, OnChanges {
	@Input()
	public theme: ComponentTheme;

	@Input()
	public placeholder: string;

	@Input()
	public preIcon: string;

	@Input()
	public label: string;

	@Input()
	public required: boolean;

	@Input()
	public disabled: boolean;

	@Input()
	public value: any;

	@Output()
	public valueChange: EventEmitter<any> = new EventEmitter<any>();

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
}
