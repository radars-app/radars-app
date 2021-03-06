import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { SlideToggleLabelPosition } from './models/slide-toggle-label-position.enum';

@Component({
	selector: 'app-slide-toggle',
	templateUrl: './slide-toggle.component.html',
	styleUrls: ['./slide-toggle.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideToggleComponent {
	@Input()
	public disabled: boolean = false;

	@Input()
	public title: string = '';

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Output()
	public toggled: EventEmitter<boolean> = new EventEmitter();

	@Input()
	public value: boolean;

	@Input()
	public labelPosition: SlideToggleLabelPosition = SlideToggleLabelPosition.Before;

	public toggle(): void {
		this.value = !this.value;
		this.toggled.emit(this.value);
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
}
