import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { RadioGroupOption } from './models/radio-group-option';

@Component({
	selector: 'app-radio-group',
	templateUrl: './radio-group.component.html',
	styleUrls: ['./radio-group.component.scss'],
})
export class RadioGroupComponent {
	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public title: string;

	@Input()
	public value: any;

	@Input()
	public disabled: boolean;

	@Input()
	public options: RadioGroupOption[];

	@Output()
	public valueChange: EventEmitter<any> = new EventEmitter<any>();

	public onValueChange(event: Event): void {
		if (event instanceof MatRadioChange) {
			this.value = event.value;
			this.valueChange.emit(event.value);
		}
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
}
