import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AccordionItem } from 'src/app/libs/common-components/accordion/models/accordion-item.models';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';
import { Radar } from '../../model/radar';
import { RadarDataItem } from '../../model/radar-data-item';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { SectorToColorConverterService } from '../../service/sector-to-color-converter.service';

@Component({
	selector: 'app-side-navigation',
	templateUrl: './side-navigation.component.html',
	styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent implements OnInit {
	public theme$: Observable<ComponentTheme>;
	public lastUpdatedDate$: Observable<Date>;
	public items$: Observable<AccordionItem[]>;
	public radar$: Observable<Radar>;

	constructor(
		public containerFacade: ContainerFacadeService,
		private radarViewFacade: RadarViewFacadeService,
		private sectorToColorConverter: SectorToColorConverterService
	) {}

	public ngOnInit(): void {
		this.theme$ = this.containerFacade.theme$;

		this.radar$ = this.radarViewFacade.radars$.pipe(
			filter((radars: Radar[]) => Boolean(radars)),
			map((radars: Radar[]) => {
				return radars[radars.length - 1];
			})
		);

		this.lastUpdatedDate$ = this.radar$.pipe(
			map((radar: Radar) => {
				return radar.lastUpdatedDate;
			})
		);

		this.items$ = combineLatest([this.radar$, this.radarViewFacade.radarDataItems$]).pipe(
			map(([radar, items]: [Radar, RadarDataItem[]]) => {
				return radar.sectors.map((sector: string) => {
					return {
						title: sector,
						opened: false,
						color: this.sectorToColorConverter.getColorBySector(sector),
						children: items
							.filter((item: RadarDataItem) => item.sector === sector)
							.map((item: RadarDataItem) => {
								return {
									id: item.id,
									title: item.name,
									number: item.number,
								};
							}),
					};
				});
			})
		);
	}
}
