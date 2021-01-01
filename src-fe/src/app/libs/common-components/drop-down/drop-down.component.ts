import { Overlay } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
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
export class DropDownComponent implements OnInit, AfterViewInit {
	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public options: DropDownOption[] = [];

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	constructor() {}

	public ngAfterViewInit(): void {
		if (this.options[0]) {
			this.options[0].callback();
		}
	}

	public ngOnInit(): void {}
}
