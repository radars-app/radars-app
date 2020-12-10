import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
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
	@Output() public showRadarDataItemDetails$: EventEmitter<string> = new EventEmitter();
	@Output() public foundItems$: Subject<RadarDataItem[]> = new Subject();

	@Input() public search$: Subject<any>;

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

		this.items$ = combineLatest([this.radar$, this.radarViewFacade.filteredRadarDataItems$]).pipe(
			filter(([_, items]: [Radar, RadarDataItem[]]) => Boolean(items)),
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

	public showRadarDataItemDetails(event: string): void {
		this.showRadarDataItemDetails$.emit(event);
	}
}
