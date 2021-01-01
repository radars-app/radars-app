import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, Subject } from 'rxjs';
import { filter, map, mergeMap, takeUntil, tap } from 'rxjs/operators';

import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { DropDownOption } from '../common-components/common/models/drop-down-option';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { Radar } from '../radar-view/model/radar';
import { RadarDataItem } from '../radar-view/model/radar-data-item';
import { RadarSorterService } from './service/radar-sorter.service';
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

	@ViewChild('radarList')
	public radarList: ElementRef;

	public sortOptions: DropDownOption[] = [
		{
			name: 'Newest to oldest',
			icon: 'sort-descending',
			callback: () => {
				const radarListElement: HTMLDivElement = this.radarList.nativeElement;
				this.radarSorterService.sortAlphabetical(radarListElement, 'radar-card__date--sort-key', true);
			},
		},
		{
			name: 'Oldest to newest',
			icon: 'sort-ascending',
			callback: () => {
				const radarListElement: HTMLDivElement = this.radarList.nativeElement;
				this.radarSorterService.sortAlphabetical(radarListElement, 'radar-card__date--sort-key', false);
			},
		},
		{
			name: 'Alphabetical A to Z',
			icon: 'a-to-z',
			callback: () => {
				const radarListElement: HTMLDivElement = this.radarList.nativeElement;
				this.radarSorterService.sortAlphabetical(radarListElement, 'radar-card__title--sort-key', true);
			},
		},
		{
			name: 'Alphabetical Z to A',
			icon: 'z-to-a',
			callback: () => {
				const radarListElement: HTMLDivElement = this.radarList.nativeElement;
				this.radarSorterService.sortAlphabetical(radarListElement, 'radar-card__title--sort-key', false);
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
		private radarSorterService: RadarSorterService,
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
