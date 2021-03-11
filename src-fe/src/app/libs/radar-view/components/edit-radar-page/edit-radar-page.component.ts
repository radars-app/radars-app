import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';
import { ButtonType } from 'src/app/libs/common-components/button/models/button-type.enum';
import { ButtonModel } from 'src/app/libs/common-components/button/models/button.model';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { IconButtonModel } from 'src/app/libs/common-components/icon-button/model/icon-button-model';
import { IconSize } from 'src/app/libs/common-components/icon/models/icon-size.enum';
import { UploadConfigDialogComponent } from 'src/app/libs/common-components/upload-config-dialog/upload-config-dialog.component';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';
import { v4 } from 'uuid';
import { Radar } from '../../model/radar';
import { RadarConfig } from '../../model/radar-config';
import { RadarDataItem } from '../../model/radar-data-item';
import { Ring } from '../../model/ring';
import { Sector } from '../../model/sector';
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
	public radar: Radar;
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

		this.radarViewFacadeService.radar$
			.pipe(
				takeUntil(this.destroy$),
				filter((radar: Radar) => Boolean(radar))
			)
			.subscribe((radar: Radar) => {
				this.radar = JSON.parse(JSON.stringify(radar)) as Radar;
				this.radar.lastUpdatedAt = new Date(this.radar.lastUpdatedAt);
				this.radar.items.forEach((item: RadarDataItem) => {
					item.updatedAt = new Date(item.updatedAt);
				});
			});
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}

	public updateLocalRadar(radar: Radar): void {
		this.radar = radar;
		this.radar.lastUpdatedAt = new Date();
	}

	public updateRadar(): void {
		this.radarViewFacadeService.uploadRadar(this.radar);
	}

	public loadRadars(): void {
		this.route.paramMap
			.pipe(
				switchMap((params: ParamMap) => params.getAll('id')),
				takeUntil(this.destroy$)
			)
			.subscribe((radarId: string) => {
				this.radarId = radarId;
				this.radarViewFacadeService.loadRadar(radarId);
			});
	}

	public applyConfig(config: RadarConfig): void {
		this.radar = JSON.parse(JSON.stringify(this.radar));
		this.radar.lastUpdatedAt = new Date(this.radar.lastUpdatedAt);
		this.radar.name = config.name;
		this.radar.rings = this.applyRings(this.radar.rings, config.rings);
		this.radar.sectors = this.applySectors(this.radar.sectors, config.sectors);
		this.radar.filterColumnName = config.filterColumnName;
		this.radar.filterColumnEnabled = config.filterColumnEnabled;
		this.radar.filterColumnKeywords = config.filterColumnKeywords;
		this.radar.nameColumn = config.nameColumn;
		this.radar.ringColumn = config.ringColumn;
		this.radar.sectorColumn = config.sectorColumn;
		this.radar.contentColumn = config.contentColumn;
		this.radar.linkColumn = config.linkColumn;
		this.radar.consideredNewInDays = config.consideredNewInDays;
		this.cdRef.markForCheck();
	}

	private applyRings(oldRings: Ring[], newRings: Ring[]): Ring[] {
		return newRings.map((newRing: Ring) => {
			const oldRing: Ring = oldRings.find((ring: Ring) => ring.label === newRing.label);
			if (Boolean(oldRing)) {
				newRing.uid = oldRing.uid;
			} else {
				newRing.uid = v4();
			}

			return newRing;
		});
	}

	private applySectors(oldSectors: Sector[], newSectors: Sector[]): Sector[] {
		return newSectors.map((newSector: Sector) => {
			const oldSector: Sector = oldSectors.find((sector: Sector) => sector.label === newSector.label);
			if (Boolean(oldSector)) {
				newSector.uid = oldSector.uid;
			} else {
				newSector.uid = v4();
			}

			return newSector;
		});
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
		this.radarViewFacadeService.radar$.pipe(take(1)).subscribe((radar: Radar) => {
			if (radar) {
				const configToDownload: RadarConfig = {
					name: this.radar.name,
					rings: this.radar.rings,
					sectors: this.radar.sectors,
					filterColumnName: this.radar.filterColumnName,
					filterColumnEnabled: this.radar.filterColumnEnabled,
					filterColumnKeywords: this.radar.filterColumnKeywords,
					nameColumn: this.radar.nameColumn,
					ringColumn: this.radar.ringColumn,
					sectorColumn: this.radar.sectorColumn,
					contentColumn: this.radar.contentColumn,
					linkColumn: this.radar.linkColumn,
					consideredNewInDays: this.radar.consideredNewInDays,
				};

				const configJSON: string = JSON.stringify(configToDownload);

				const blob: Blob = new Blob([configJSON], { type: 'text/json' });
				const url: string = window.URL.createObjectURL(blob);
				this.sanitizer.bypassSecurityTrustUrl(url);

				const link: HTMLAnchorElement = document.createElement('a');
				link.setAttribute('type', 'hidden');
				link.href = url;
				const radarConfigFileName: string = radar.name.trim().replace(/\s/g, '_').toLowerCase();
				link.download = `${radarConfigFileName}.config.json`;
				document.body.appendChild(link);
				link.click();
				link.remove();
			}
		});
	}
}
