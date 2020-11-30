import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';

@Component({
	selector: 'app-radar-chart-legend',
	templateUrl: './radar-chart-legend.component.html',
	styleUrls: ['./radar-chart-legend.component.scss'],
})
export class RadarChartLegendComponent implements OnInit {
	public sectors: string[];
	public rings: string[];
	public theme$: Observable<ComponentTheme>;

	constructor(public containerFacade: ContainerFacadeService) {}

	public ngOnInit(): void {
		this.theme$ = this.containerFacade.theme$;
		this.sectors = ['Technologies', 'Cloud', 'OS', 'Oiling', 'Optimization'];

		this.rings = ['Trial', 'Hold', 'Investigate'];
	}

	public getRingIcon(isLast: boolean): string {
		return !isLast ? 'ring_legend' : 'ring_legend_base';
	}
}
