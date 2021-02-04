import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { ComponentTheme } from '../../../../common-components/common/enum/component-theme.enum';
import { InfoDialogComponent } from '../../../../common-components/info-dialog/info-dialog.component';
import { RadarDataItem } from '../../../model/radar-data-item';
import { SectorToColorConverterService } from '../../../service/sector-to-color-converter.service';

@Component({
	selector: 'app-cluster-item',
	templateUrl: './cluster-item.component.html',
	styleUrls: ['./cluster-item.component.scss'],
})
export class ClusterItemComponent {
	@ViewChild(InfoDialogComponent, { static: true })
	public readonly infoDialog: InfoDialogComponent;

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public dot: RadarDataItem;

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	constructor(public sectorToColorConverter: SectorToColorConverterService) {}

	@HostListener('click')
	public onClick(): void {
		this.infoDialog.open(this.dot.id);
	}
}
