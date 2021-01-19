import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { ButtonType } from '../../../common-components/button/models/button-type.enum';
import { ButtonModel } from '../../../common-components/button/models/button.model';
import { IconButtonModel } from '../../../common-components/icon-button/model/icon-button-model';
import { IconSize } from '../../../common-components/icon/models/icon-size.enum';
import { UploadConfigDialogComponent } from '../../../common-components/upload-config-dialog/upload-config-dialog.component';
import { RadarConfig } from '../../model/radar-config';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { v4 } from 'uuid';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';
import { Observable } from 'rxjs/internal/Observable';
import { ContainerFacadeService } from '../../../container/service/container-facade.service';

@Component({
	selector: 'app-create-radar-page',
	templateUrl: './create-radar-page.component.html',
	styleUrls: ['./create-radar-page.component.scss'],
})
export class CreateRadarPageComponent implements OnInit, OnDestroy {
	@ViewChild('uploadConfigPopover', { static: true })
	public readonly uploadConfigPopover: UploadConfigDialogComponent;

	public radarId: string;
	public theme$: Observable<ComponentTheme>;
	public buttons: IconButtonModel[];
	public extraButtons: ButtonModel[];
	public config: RadarConfig;

	private destroy$: Subject<boolean>;

	constructor(
		private router: Router,
		private cdRef: ChangeDetectorRef,
		private radarViewFacadeService: RadarViewFacadeService,
		private containerFacadeService: ContainerFacadeService
	) {}

	public ngOnInit(): void {
		this.destroy$ = new Subject<boolean>();
		this.theme$ = this.containerFacadeService.theme$;
		this.radarId = v4();

		this.initCommandButtons();
		this.initRadarConfig();
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}

	public applyConfig(config: RadarConfig): void {
		this.config = JSON.parse(JSON.stringify(this.config));
		this.config.name = config.name;
		this.config.rings = config.rings;
		this.config.sectors = config.sectors;
		this.cdRef.markForCheck();
	}

	public updateLocalConfig(config: RadarConfig): void {
		this.config = config;
	}

	private initRadarConfig(): void {
		this.config = {
			name: '',
			csv: '',
			rings: [],
			sectors: [],
		};
	}

	private initCommandButtons(): void {
		const downloadButton: IconButtonModel = {
			label: 'Download .config',
			callback: () => {},
			icon: 'download',
			iconSize: IconSize.Small,
			disabled: true,
		};

		const uploadButton: IconButtonModel = {
			label: 'Upload .config',
			callback: () => {
				this.uploadConfigPopover.open();
			},
			icon: 'upload',
			iconSize: IconSize.Small,
			disabled: false,
		};

		const cancelButton: ButtonModel = {
			label: 'Cancel',
			callback: () => {
				this.router.navigateByUrl(`/`);
			},
			disabled: false,
			type: ButtonType.Outlined,
		};

		const applyButton: ButtonModel = {
			label: 'Apply radar data',
			callback: () => {
				this.createRadar();
				this.router.navigateByUrl(`/radars/${this.radarId}`);
			},
			disabled: false,
			type: ButtonType.Flat,
		};

		this.buttons = [downloadButton, uploadButton];
		this.extraButtons = [cancelButton, applyButton];
	}

	private createRadar(): void {
		this.radarViewFacadeService.createRadar(this.radarId, this.config);
	}
}
