import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, Subject } from 'rxjs';
import { filter, map, mergeMap, takeUntil, tap } from 'rxjs/operators';

import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { Radar } from '../radar-view/model/radar';
import { RadarDataItem } from '../radar-view/model/radar-data-item';
import { RadarsGeneralViewFacadeService } from './service/radars-general-view-facade.service';
import { RadarsGeneralViewRepositoryService } from './service/radars-general-view-repository.service';

@Component({
	selector: 'app-radars-general-view',
	templateUrl: './radars-general-view.component.html',
	styleUrls: ['./radars-general-view.component.scss'],
})
export class RadarsGeneralViewComponent implements OnInit, OnDestroy {
	public theme$: Observable<ComponentTheme>;

	public isDarkTheme$: Observable<boolean>;

	public radars: Radar[];

	public radarDataItems: RadarDataItem[][] = [];

	public get radarsCount(): number {
		return this.radars?.length;
	}

	private destroy$: Subject<void>;

	constructor(
		private containerFacadeService: ContainerFacadeService,
		private radarsGeneralViewFacadeService: RadarsGeneralViewFacadeService,
		private radarsGeneralViewRepositoryService: RadarsGeneralViewRepositoryService,
		private router: Router
	) {}

	public ngOnInit(): void {
		this.destroy$ = new Subject();
		this.theme$ = this.containerFacadeService.theme$;
		this.isDarkTheme$ = this.containerFacadeService.theme$.pipe(
			map((theme: ComponentTheme) => theme === ComponentTheme.Dark),
			takeUntil(this.destroy$)
		);
		this.radarsGeneralViewFacadeService.loadRadars();
		this.radarsGeneralViewFacadeService.radars$
			.pipe(
				filter((radars: Radar[]) => Boolean(radars)),
				tap((radars: Radar[]) => {
					this.radars = radars;
				}),
				mergeMap((radars: Radar[]) => {
					return forkJoin(radars.map((radar: Radar) => this.radarsGeneralViewRepositoryService.loadRadarDataItems(radar.id)));
				}),
				tap((radarDataItems: RadarDataItem[][]) => {
					this.radarDataItems = radarDataItems;
				}),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public navigateToRadar(radarId: string): void {
		this.router.navigate([`radars/${radarId}`]);
	}
}
