import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { ButtonType } from 'src/app/libs/common-components/button/models/button-type.enum';
import { ButtonModel } from 'src/app/libs/common-components/button/models/button.model';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { IconButtonModel } from 'src/app/libs/common-components/icon-button/model/icon-button-model';
import { IconSize } from 'src/app/libs/common-components/icon/models/icon-size.enum';
import { UploadConfigDialogComponent } from 'src/app/libs/common-components/upload-config-dialog/upload-config-dialog.component';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';
import { Radar } from '../../model/radar';
import { RadarConfig } from '../../model/radar-config';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';

@Component({
	selector: 'app-edit-radar-page',
	templateUrl: './edit-radar-page.component.html',
	styleUrls: ['./edit-radar-page.component.scss'],
})
export class EditRadarPageComponent implements OnInit, OnDestroy {
	@ViewChild('uploadConfigPopover', { static: true })
	public readonly uploadConfigPopover: UploadConfigDialogComponent;

	public theme$: Observable<ComponentTheme>;
	public buttons: IconButtonModel[];
	public extraButtons: ButtonModel[];
	public config: RadarConfig;
	public radarId: string;

	private destroy$: Subject<boolean>;

	constructor(
		private router: Router,
		private containerFacadeService: ContainerFacadeService,
		private radarViewFacadeService: RadarViewFacadeService,
		private sanitizer: DomSanitizer,
		private route: ActivatedRoute,
		private cdRef: ChangeDetectorRef
	) {}

	public ngOnInit(): void {
		this.destroy$ = new Subject<boolean>();
		this.theme$ = this.containerFacadeService.theme$;

		this.initCommandButtons();
		this.loadRadars();

		this.radarViewFacadeService.radars$
			.pipe(
				takeUntil(this.destroy$),
				filter((radars: Radar[]) => Boolean(radars)),
				map((radars: Radar[]) => radars[radars.length - 1])
			)
			.subscribe((radar: Radar) => {
				this.config = JSON.parse(JSON.stringify(radar.config)) as RadarConfig;
			});
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}

	public updateLocalConfig(config: RadarConfig): void {
		this.config = config;
	}

	public updateRadar(): void {
		this.radarViewFacadeService.uploadRadar(this.radarId, this.config);
	}

	public loadRadars(): void {
		this.route.paramMap
			.pipe(
				switchMap((params: ParamMap) => params.getAll('id')),
				takeUntil(this.destroy$)
			)
			.subscribe((radarId: string) => {
				this.radarId = radarId;
				this.radarViewFacadeService.loadRadars(radarId);
			});
	}

	public applyConfig(config: RadarConfig): void {
		this.config = JSON.parse(JSON.stringify(this.config));
		this.config.name = config.name;
		this.config.rings = config.rings;
		this.config.sectors = config.sectors;
		this.cdRef.markForCheck();
	}

	private initCommandButtons(): void {
		const downloadButton: IconButtonModel = {
			label: 'Download .config',
			callback: () => {
				this.downloadConfig();
			},
			icon: 'download',
			iconSize: IconSize.Medium,
			disabled: false,
		};

		const uploadButton: IconButtonModel = {
			label: 'Upload .config',
			callback: () => {
				this.uploadConfigPopover.open();
			},
			icon: 'upload',
			iconSize: IconSize.Medium,
			disabled: false,
		};

		const cancelButton: ButtonModel = {
			label: 'Cancel',
			callback: () => {
				this.router.navigateByUrl(`/radars/${this.radarId}`);
			},
			disabled: false,
			type: ButtonType.Outlined,
		};

		const applyButton: ButtonModel = {
			label: 'Apply radar data',
			callback: () => {
				this.updateRadar();
				this.router.navigateByUrl(`/radars/${this.radarId}`);
			},
			disabled: false,
			type: ButtonType.Flat,
		};

		this.buttons = [downloadButton, uploadButton];
		this.extraButtons = [cancelButton, applyButton];
	}

	private downloadConfig(): void {
		this.radarViewFacadeService.radars$.pipe(take(1)).subscribe((radars: Radar[]) => {
			const latestRadar: Radar = radars[radars.length - 1];
			if (latestRadar) {
				const configToDownload: RadarConfig = JSON.parse(JSON.stringify(latestRadar.config));
				delete configToDownload.csv;
				const configJSON: string = JSON.stringify(configToDownload);

				const blob: Blob = new Blob([configJSON], { type: 'text/json' });
				const url: string = window.URL.createObjectURL(blob);
				this.sanitizer.bypassSecurityTrustUrl(url);

				const link: HTMLAnchorElement = document.createElement('a');
				link.setAttribute('type', 'hidden');
				link.href = url;
				const radarConfigFileName: string = latestRadar.name.trim().replace(/\s/g, '_').toLowerCase();
				link.download = `${radarConfigFileName}.config.json`;
				document.body.appendChild(link);
				link.click();
				link.remove();
			}
		});
	}
}
