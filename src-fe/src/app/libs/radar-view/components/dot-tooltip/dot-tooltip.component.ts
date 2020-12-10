import { Component, Input, OnInit } from '@angular/core';
import { RadarDataItem } from '../../model/radar-data-item';
import { RingToIconConverterService } from '../../service/ring-to-icon-converter.service';
import { SectorToColorConverterService } from '../../service/sector-to-color-converter.service';

@Component({
	selector: 'app-dot-tooltip',
	templateUrl: './dot-tooltip.component.html',
	styleUrls: ['./dot-tooltip.component.scss'],
})
export class DotTooltipComponent implements OnInit {
	@Input()
	public dot: RadarDataItem;

	constructor(public sectorToColorConverter: SectorToColorConverterService, public ringToIconConverter: RingToIconConverterService) {}

	public ngOnInit(): void {}
}
