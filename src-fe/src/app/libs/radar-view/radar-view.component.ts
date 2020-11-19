import { Component, OnInit } from '@angular/core';
import { IconButtonModel } from '../common-components/icon-button/model/icon-button-model';
import { IconSize } from '../common-components/icon/models/icon-size.enum';

@Component({
	selector: 'app-radars-radar-view',
	templateUrl: './radar-view.component.html',
	styleUrls: ['./radar-view.component.scss'],
})
export class RadarViewComponent implements OnInit {
	public buttons: IconButtonModel[];

	constructor() {}

	public ngOnInit(): void {
		const printButton: IconButtonModel = {
			label: 'Print Radar',
			callback: () => {},
			icon: 'print',
			iconSize: IconSize.S,
		};

		const editButton: IconButtonModel = {
			label: 'Edit',
			callback: () => {},
			icon: 'edit-1',
			iconSize: IconSize.S,
		};

		const removeButton: IconButtonModel = {
			label: 'Remove',
			callback: () => {},
			icon: 'remove',
			iconSize: IconSize.S,
		};

		this.buttons = [printButton, editButton, removeButton];
	}
}
