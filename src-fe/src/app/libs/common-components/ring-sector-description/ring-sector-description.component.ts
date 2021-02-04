import { Component, Input } from '@angular/core';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { RingToIconConverterService } from '../../radar-view/service/ring-to-icon-converter.service';
import { SectorToColorConverterService } from '../../radar-view/service/sector-to-color-converter.service';

@Component({
	selector: 'app-ring-sector-description',
	templateUrl: './ring-sector-description.component.html',
	styleUrls: ['./ring-sector-description.component.scss'],
})
export class RingSectorDescriptionComponent {
	@Input()
	public ring: string;

	@Input()
	public sector: string;

	@Input()
	public horizontal: boolean = false;

	@Input()
	private theme: ComponentTheme;

	constructor(public sectorToColorConverter: SectorToColorConverterService, public ringToIconConverter: RingToIconConverterService) {}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
}
