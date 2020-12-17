import { Component, Input, OnInit } from '@angular/core';
import { RadarDataItem } from '../../model/radar-data-item';
import { RingToIconConverterService } from '../../service/ring-to-icon-converter.service';
import { SectorToColorConverterService } from '../../service/sector-to-color-converter.service';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';

@Component({
	selector: 'app-dot-tooltip',
	templateUrl: './dot-tooltip.component.html',
	styleUrls: ['./dot-tooltip.component.scss'],
})
export class DotTooltipComponent implements OnInit {
	@Input()
	public dot: RadarDataItem;

	@Input()
	private theme: ComponentTheme;

	constructor(public sectorToColorConverter: SectorToColorConverterService, public ringToIconConverter: RingToIconConverterService) {}

	public ngOnInit(): void {}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
}
