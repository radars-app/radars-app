import { OnDestroy, ViewChild, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { IconButtonModel } from '../common-components/icon-button/model/icon-button-model';
import { IconSize } from '../common-components/icon/models/icon-size.enum';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { RadarViewFacadeService } from './service/radar-view-facade.service';

@Component({
	selector: 'app-radars-radar-view',
	templateUrl: './radar-view.component.html',
	styleUrls: ['./radar-view.component.scss'],
})
export class RadarViewComponent implements OnInit, OnDestroy {
	@ViewChild('editRadarDialog', { static: true }) public readonly editRadarDialog: EditDialogComponent;

	public buttons: IconButtonModel[];

	public theme$: Observable<ComponentTheme> = this.containerFacadeService.theme$;

	private destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private containerFacadeService: ContainerFacadeService,
		private route: ActivatedRoute,
		private radarViewFacadeSevice: RadarViewFacadeService
	) {}

	public ngOnInit(): void {
		this.initCommandButtons();
		this.route.paramMap
			.pipe(
				switchMap((params: ParamMap) => params.getAll('id')),
				takeUntil(this.destroy$)
			)
			.subscribe((radarID: string) => {
				this.radarViewFacadeSevice.downloadRadars(radarID);
			});
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}

	private initCommandButtons(): void {
		const printButton: IconButtonModel = {
			label: 'Print Radar',
			callback: () => {},
			icon: 'print',
			iconSize: IconSize.S,
		};

		const editButton: IconButtonModel = {
			label: 'Edit',
			callback: () => {
				this.editRadarDialog.open();
			},
			icon: 'edit_1',
			iconSize: IconSize.S,
		};

		const removeButton: IconButtonModel = {
			label: 'Remove',
			callback: () => {},
			icon: 'delete',
			iconSize: IconSize.S,
		};

		this.buttons = [printButton, editButton, removeButton];
	}
}
