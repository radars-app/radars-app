import { OnDestroy, ViewChild, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { IconButtonModel } from '../common-components/icon-button/model/icon-button-model';
import { IconSize } from '../common-components/icon/models/icon-size.enum';
import { InfoDialogComponent } from '../common-components/info-dialog/info-dialog.component';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { Radar } from './model/radar';
import { RadarViewFacadeService } from './service/radar-view-facade.service';

@Component({
	selector: 'app-radars-radar-view',
	templateUrl: './radar-view.component.html',
	styleUrls: ['./radar-view.component.scss'],
})
export class RadarViewComponent implements OnInit, OnDestroy {
	@ViewChild('infoDialog', { static: true }) public readonly infoDialog: InfoDialogComponent;

	public searchPlaceholder: string = 'Search and filter dots by keywords';
	public buttons: IconButtonModel[];
	public theme$: Observable<ComponentTheme> = this.containerFacadeService.theme$;
	public radarName$: Observable<string>;
	public radarId: string;

	private destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private containerFacadeService: ContainerFacadeService,
		private route: ActivatedRoute,
		private radarViewFacadeService: RadarViewFacadeService,
		private router: Router
	) {}

	public ngOnInit(): void {
		this.initCommandButtons();
		this.route.paramMap
			.pipe(
				switchMap((params: ParamMap) => params.getAll('id')),
				takeUntil(this.destroy$)
			)
			.subscribe((radarId: string) => {
				this.radarId = radarId;
				this.radarViewFacadeService.loadRadars(radarId);
			});

		this.radarName$ = this.radarViewFacadeService.radars$.pipe(
			takeUntil(this.destroy$),
			filter((radars: Radar[]) => Boolean(radars)),
			map((radars: Radar[]) => radars[radars.length - 1].name)
		);
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}

	public openInfoDialog(event: string): void {
		this.infoDialog.open(event);
	}

	public search(searchString: string): void {
		this.radarViewFacadeService.searchRadarItems(searchString);
	}

	private initCommandButtons(): void {
		const printButton: IconButtonModel = {
			label: 'Print Radar',
			callback: () => {},
			icon: 'print',
			iconSize: IconSize.S,
			disabled: true,
		};

		const editButton: IconButtonModel = {
			label: 'Edit',
			callback: () => {
				this.router.navigateByUrl(`/radars/${this.radarId}/edit`);
			},
			icon: 'edit_1',
			iconSize: IconSize.S,
			disabled: false,
		};

		const removeButton: IconButtonModel = {
			label: 'Remove',
			callback: () => {},
			icon: 'delete',
			iconSize: IconSize.S,
			disabled: true,
		};

		this.buttons = [printButton, editButton, removeButton];
	}
}
