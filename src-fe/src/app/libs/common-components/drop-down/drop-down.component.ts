import { Overlay } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { DropDownOption } from '../common/models/drop-down-option';
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
export class DropDownComponent implements AfterViewInit {
	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public options: DropDownOption[];

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public get firstValue(): DropDownOption {
		return this?.options[0];
	}

	constructor() {}

	public ngAfterViewInit(): void {
		this?.options[0]?.callback();
	}
}
