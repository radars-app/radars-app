import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, Subject } from 'rxjs';
import { filter, map, mergeMap, takeUntil, tap } from 'rxjs/operators';

import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { DropDownItem } from '../common-components/common/models/drop-down-item';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { Radar } from '../radar-view/model/radar';
import { RadarDataItem } from '../radar-view/model/radar-data-item';
import { RadarsGeneralViewFacadeService } from './service/radars-general-view-facade.service';
import { RadarsGeneralViewRepository } from './service/radars-general-view-repository.service';

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

	public sortItems: DropDownItem[] = [
		{
			name: 'Newest to oldest',
			icon: 'sort-descending',
			callback: () => {
				console.log('1');
			},
		},
		{
			name: 'Oldest to newest',
			icon: 'sort-ascending',
			callback: () => {
				console.log('2');
			},
		},
		{
			name: 'Alphabetical A to Z',
			icon: '',
			callback: () => {
				console.log('3');
			},
		},
		{
			name: 'Alphabetical Z to A',
			icon: '',
			callback: () => {
				console.log('4');
			},
		},
	];

	public get radarsCount(): number {
		return this.radars?.length;
	}

	private destroy$: Subject<void>;

	constructor(
		private containerFacadeService: ContainerFacadeService,
		private radarsGeneralViewFacadeService: RadarsGeneralViewFacadeService,
		private radarsGeneralViewRepository: RadarsGeneralViewRepository,
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
					return forkJoin(radars.map((radar: Radar) => this.radarsGeneralViewRepository.loadRadarDataItems(radar.id)));
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
