import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { Radar } from '../radar-view/model/radar';
import { RadarsGeneralViewFacadeService } from './service/radars-general-view-facade.service';

@Component({
	selector: 'app-radars-general-view',
	templateUrl: './radars-general-view.component.html',
	styleUrls: ['./radars-general-view.component.scss'],
})
export class RadarsGeneralViewComponent implements OnInit, OnDestroy {
	public theme$: Observable<ComponentTheme>;

	public isDarkTheme$: Observable<boolean>;

	public radarsCount$: Observable<number>;

	public radars$: Observable<Radar[]>;

	private destroy$: Subject<void>;

	constructor(
		private containerFacadeService: ContainerFacadeService,
		private radarsGeneralViewFacadeService: RadarsGeneralViewFacadeService,
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
		this.radarsCount$ = this.radarsGeneralViewFacadeService.radars$.pipe(
			map((latestRadars: Radar[]) => latestRadars?.length),
			takeUntil(this.destroy$)
		);
		this.radars$ = this.radarsGeneralViewFacadeService.radars$;
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public navigateToRadar(radarId: string): void {
		this.router.navigate([`radars/${radarId}`]);
	}
}
