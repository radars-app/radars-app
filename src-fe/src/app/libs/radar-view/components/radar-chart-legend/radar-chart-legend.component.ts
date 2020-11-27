import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-radar-chart-legend',
	templateUrl: './radar-chart-legend.component.html',
	styleUrls: ['./radar-chart-legend.component.scss'],
})
export class RadarChartLegendComponent implements OnInit {
	public sectors: string[];
	public rings: string[];

	constructor() {}

	public ngOnInit(): void {
		this.sectors = ['Technologies', 'Cloud', 'OS', 'Oiling', 'Optimization'];

		this.rings = ['Trial', 'Hold', 'Investigate'];
	}

	public getRingIcon(isLast: boolean): string {
		return !isLast ? 'ring_legend' : 'ring_legend_base';
	}
}
