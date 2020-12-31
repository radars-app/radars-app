import { Overlay } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class DropDownComponent implements OnInit, OnChanges {
	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public options: DropDownOption[] = [];

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	constructor() {}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.options.currentValue[0]) {
			changes.options.currentValue[0].callback();
		}
	}

	public ngOnInit(): void {}
}
