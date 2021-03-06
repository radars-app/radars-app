import { Component, Input } from '@angular/core';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';
import { RadarDataItem } from '../../model/radar-data-item';

@Component({
	selector: 'app-dot-tooltip',
	templateUrl: './dot-tooltip.component.html',
	styleUrls: ['./dot-tooltip.component.scss'],
})
export class DotTooltipComponent {
	@Input()
	public item: RadarDataItem;

	@Input()
	private theme: ComponentTheme;

	public get darkTheme(): ComponentTheme {
		return ComponentTheme.Dark;
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	constructor() {}
}
