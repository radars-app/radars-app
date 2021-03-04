import { EventEmitter } from '@angular/core';
import { Component, ViewChild, Input, HostListener, Output } from '@angular/core';
import { RadarDataItem } from '../../../radar-view/model/radar-data-item';
import { ComponentTheme } from '../../common/enum/component-theme.enum';
import { InfoDialogComponent } from '../info-dialog.component';

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

	@Output()
	public dotClicked: EventEmitter<RadarDataItem> = new EventEmitter<RadarDataItem>();

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	constructor() {}

	@HostListener('click')
	public onClick(): void {
		this.dotClicked.next(this.dot);
	}
}
