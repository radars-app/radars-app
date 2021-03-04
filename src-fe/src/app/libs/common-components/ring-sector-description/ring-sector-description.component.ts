import { Component, Input } from '@angular/core';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { RingToIconConverterService } from '../../radar-view/service/ring-to-icon-converter.service';
import { Sector } from '../../radar-view/model/sector';
import { Ring } from '../../radar-view/model/ring';

@Component({
	selector: 'app-ring-sector-description',
	templateUrl: './ring-sector-description.component.html',
	styleUrls: ['./ring-sector-description.component.scss'],
})
export class RingSectorDescriptionComponent {
	@Input()
	public ring: Ring;

	@Input()
	public sector: Sector;

	@Input()
	public horizontal: boolean = false;

	@Input()
	private theme: ComponentTheme;

	constructor(public ringToIconConverter: RingToIconConverterService) {}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
}
