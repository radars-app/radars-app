import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-radar-header',
	templateUrl: './radar-header.component.html',
	styleUrls: ['./radar-header.component.scss'],
})
export class RadarHeaderComponent implements OnInit {
	@Input() public title: string;

	constructor() {}

	public ngOnInit(): void {}
}
