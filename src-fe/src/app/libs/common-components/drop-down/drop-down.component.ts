import { Overlay } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { DropDownOption } from './model/drop-down-option';
import { CustomSelectOverlay } from './custom-select-overlay';

@Component({
	selector: 'app-drop-down',
	templateUrl: './drop-down.component.html',
	styleUrls: ['./drop-down.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	viewProviders: [
		{
			provide: Overlay,
			useClass: CustomSelectOverlay,
		},
	],
})
export class DropDownComponent {
	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public options: DropDownOption[];

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public get firstValue(): DropDownOption {
		return this.options?.[0];
	}

	constructor() {}
}
