import { OnDestroy, ViewChild, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { IconButtonModel } from '../common-components/icon-button/model/icon-button-model';
import { IconSize } from '../common-components/icon/models/icon-size.enum';
import { InfoDialogComponent } from '../common-components/info-dialog/info-dialog.component';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { DeleteRadarConfirmationDialogComponent } from './components/delete-radar-confirmation-dialog/delete-radar-confirmation-dialog.component';
import { Radar } from './model/radar';
import { RadarViewFacadeService } from './service/radar-view-facade.service';

@Component({
	selector: 'app-radars-radar-view',
	templateUrl: './radar-view.component.html',
	styleUrls: ['./radar-view.component.scss'],
})
export class RadarViewComponent implements OnInit, OnDestroy {
	@ViewChild('infoDialog', { static: true }) public readonly infoDialog: InfoDialogComponent;
	@ViewChild('deleteRadarConfirmationDialog', { static: true })
	public readonly deleteRadarConfirmationDialog: DeleteRadarConfirmationDialogComponent;

	public buttons: IconButtonModel[];
	public theme$: Observable<ComponentTheme> = this.containerFacadeService.theme$;
	public radarName$: Observable<string>;
	public radarId: string;

	private destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private containerFacadeService: ContainerFacadeService,
		private route: ActivatedRoute,
		public radarViewFacadeService: RadarViewFacadeService,
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

	public onRemoveConfirmed(): void {
		this.radarViewFacadeService.removeRadar(this.radarId);
		this.router.navigateByUrl('/');
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
			iconSize: IconSize.Medium,
			disabled: true,
		};

		const editButton: IconButtonModel = {
			label: 'Edit',
			callback: () => {
				this.router.navigateByUrl(`/radars/${this.radarId}/edit`);
			},
			icon: 'edit_1',
			iconSize: IconSize.Medium,
			disabled: false,
		};

		const removeButton: IconButtonModel = {
			label: 'Remove',
			callback: () => {
				this.deleteRadarConfirmationDialog.open();
			},
			icon: 'delete',
			iconSize: IconSize.Medium,
			disabled: false,
		};

		this.buttons = [printButton, editButton, removeButton];
	}
}
