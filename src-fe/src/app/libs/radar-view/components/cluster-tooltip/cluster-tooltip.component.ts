import { Component, Input } from '@angular/core';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';
import { RadarDataItem } from '../../model/radar-data-item';

@Component({
	selector: 'app-cluster-tooltip',
	templateUrl: './cluster-tooltip.component.html',
	styleUrls: ['./cluster-tooltip.component.scss'],
})
export class ClusterTooltipComponent {
	@Input()
	public items: RadarDataItem[];

	@Input()
	public theme: ComponentTheme;

	constructor() {}

	public get sector(): string {
		return this.items[0].sector;
	}

	public get ring(): string {
		return this.items[0].ring;
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
}
