import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { DropDownOption } from '../common-components/drop-down/model/drop-down-option';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { Radar } from '../radar-view/model/radar';
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

	public radars: Radar[];

	public get radarsQuantity(): number {
		return this.radars?.length;
	}

	public sortOptions: DropDownOption[] = [
		{
			name: 'Newest to oldest',
			icon: 'sort-descending',
			callback: () => {
				this.radars = this.radarSorterService.sortByDate(this.radars, true);
			},
		},
		{
			name: 'Oldest to newest',
			icon: 'sort-ascending',
			callback: () => {
				this.radars = this.radarSorterService.sortByDate(this.radars, false);
			},
		},
		{
			name: 'Alphabetical A to Z',
			icon: 'a-to-z',
			callback: () => {
				this.radars = this.radarSorterService.sortAlphabetical(this.radars, true);
			},
		},
		{
			name: 'Alphabetical Z to A',
			icon: 'z-to-a',
			callback: () => {
				this.radars = this.radarSorterService.sortAlphabetical(this.radars, false);
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
		this.isDarkTheme$ = this.containerFacadeService.isDarkTheme$;
		this.radarsGeneralViewFacadeService.loadRadars();
		this.radarsGeneralViewFacadeService.radars$
			.pipe(
				filter((radars: Radar[]) => Boolean(radars)),
				takeUntil(this.destroy$)
			)
			.subscribe((radarsWithData: Radar[]) => {
				this.radars = radarsWithData;
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
