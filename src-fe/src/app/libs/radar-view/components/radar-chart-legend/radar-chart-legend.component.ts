import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';
import { Radar } from '../../model/radar';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { SectorToColorConverterService } from '../../service/sector-to-color-converter.service';

@Component({
	selector: 'app-radar-chart-legend',
	templateUrl: './radar-chart-legend.component.html',
	styleUrls: ['./radar-chart-legend.component.scss'],
})
export class RadarChartLegendComponent implements OnInit {
	public theme$: Observable<ComponentTheme>;
	public sectors$: Observable<string[]>;
	public rings$: Observable<string[]>;
	public radar$: Observable<Radar>;

	constructor(
		public containerFacade: ContainerFacadeService,
		public sectorToColorConverter: SectorToColorConverterService,
		public radarViewFacade: RadarViewFacadeService
	) {}

	public ngOnInit(): void {
		this.theme$ = this.containerFacade.theme$;
		this.radar$ = this.radarViewFacade.radars$.pipe(
			filter((radars: Radar[]) => Boolean(radars)),
			map((radars: Radar[]) => radars[radars.length - 1])
		);
		this.sectors$ = this.radar$.pipe(map((radar: Radar) => radar.sectors));
		this.rings$ = this.radar$.pipe(map((radar: Radar) => [...radar.rings].reverse()));
	}

	public getRingIcon(isLast: boolean): string {
		return !isLast ? 'ring_legend' : 'ring_legend_base';
	}
}
