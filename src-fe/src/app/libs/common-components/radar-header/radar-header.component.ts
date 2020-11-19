import { Component, Input, OnInit } from '@angular/core';
import { IconButtonModel } from '../icon-button/model/icon-button-model';

@Component({
	selector: 'app-radar-header',
	templateUrl: './radar-header.component.html',
	styleUrls: ['./radar-header.component.scss'],
})
export class RadarHeaderComponent implements OnInit {
	@Input() public title: string;
	@Input() public buttons: IconButtonModel[];

	constructor() {}

	public ngOnInit(): void {}
}
