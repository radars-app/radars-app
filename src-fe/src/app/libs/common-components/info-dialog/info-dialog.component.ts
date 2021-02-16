import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RadarDataItem } from '../../radar-view/model/radar-data-item';
import { RadarViewFacadeService } from '../../radar-view/service/radar-view-facade.service';
import { SectorToColorConverterService } from '../../radar-view/service/sector-to-color-converter.service';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { ModalWindowComponent } from '../modal-window/modal-window.component';

@Component({
	selector: 'app-radars-info-dialog',
	templateUrl: './info-dialog.component.html',
	styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent implements OnInit, OnDestroy {
	@ViewChild('modal', { static: true })
	public readonly modal: ModalWindowComponent;

	@Input() public theme: ComponentTheme = ComponentTheme.Light;

	public selectedRadarDataItem: RadarDataItem;
	public selectedRadarDataItemContent: SafeHtml;
	public selectedRadarDataItemId$: Subject<string> = new Subject<string>();

	public destroy$: Subject<void> = new Subject<void>();

	constructor(
		private radarViewFacadeService: RadarViewFacadeService,
		public sectorToColorConverter: SectorToColorConverterService,
		private sanitizer: DomSanitizer
	) {}

	public ngOnInit(): void {
		combineLatest([this.radarViewFacadeService.radarDataItems$, this.selectedRadarDataItemId$])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([radarDataItems, id]: [RadarDataItem[], string]) => {
				this.selectedRadarDataItem = radarDataItems.find((radarDataItem: RadarDataItem) => radarDataItem.id === id);
				const HTMLString: string = this.selectedRadarDataItem.content;
				this.selectedRadarDataItemContent = this.sanitizer.bypassSecurityTrustHtml(HTMLString);
			});
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public open(radarItemId: string): void {
		this.selectedRadarDataItemId$.next(radarItemId);
		this.modal.open();
	}

	public close(): void {
		this.modal.close();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
