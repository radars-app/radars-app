import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { DropDownOption } from '../common-components/common/models/drop-down-option';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { RadarWithData } from './model/radar-with-data';
import { RadarSorterService } from './service/radar-sorter.service';
import { RadarsGeneralViewFacadeService } from './service/radars-general-view-facade.service';

@Component({
	selector: 'app-radars-general-view',
	templateUrl: './radars-general-view.component.html',
	styleUrls: ['./radars-general-view.component.scss'],
})
export class RadarsGeneralViewComponent implements OnInit, OnDestroy {
	public theme$: Observable<ComponentTheme>;

	public isDarkTheme$: Observable<boolean>;

	public radarsWithData: RadarWithData[];

	public get radarsQuantity(): number {
		return this.radarsWithData?.length;
	}

	public sortOptions: DropDownOption[] = [
		{
			name: 'Newest to oldest',
			icon: 'sort-descending',
			callback: () => {
				this.radarsWithData = this.radarSorterService.sortByDate(this.radarsWithData, true);
			},
		},
		{
			name: 'Oldest to newest',
			icon: 'sort-ascending',
			callback: () => {
				this.radarsWithData = this.radarSorterService.sortByDate(this.radarsWithData, false);
			},
		},
		{
			name: 'Alphabetical A to Z',
			icon: 'a-to-z',
			callback: () => {
				this.radarsWithData = this.radarSorterService.sortAlphabetical(this.radarsWithData, true);
			},
		},
		{
			name: 'Alphabetical Z to A',
			icon: 'z-to-a',
			callback: () => {
				this.radarsWithData = this.radarSorterService.sortAlphabetical(this.radarsWithData, false);
			},
		},
	];

	private destroy$: Subject<void>;

	constructor(
		private containerFacadeService: ContainerFacadeService,
		private radarsGeneralViewFacadeService: RadarsGeneralViewFacadeService,
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
		this.radarsGeneralViewFacadeService.loadRadarsWithData();
		this.radarsGeneralViewFacadeService.radarsWithData$
			.pipe(
				filter((radars: RadarWithData[]) => Boolean(radars)),
				takeUntil(this.destroy$)
			)
			.subscribe((radarsWithData: RadarWithData[]) => {
				this.radarsWithData = radarsWithData;
				this.sortOptions[0].callback();
			});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public navigateToRadar(radarId: string): void {
		this.router.navigate([`radars/${radarId}`]);
	}
}
