import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
export class InfoDialogComponent implements OnInit {
	@ViewChild('modal', { static: true })
	public readonly modal: ModalWindowComponent;

	@Input() public theme: ComponentTheme = ComponentTheme.Light;

	public selectedRadarDataItem$: Observable<RadarDataItem>;
	public selectedRadarDataItemContent$: Observable<SafeHtml>;
	public selectedRadarDataItemId$: Subject<string> = new Subject<string>();

	constructor(
		private radarViewFacadeSevice: RadarViewFacadeService,
		public sectorToColorConverter: SectorToColorConverterService,
		private sanitizer: DomSanitizer
	) {}

	public ngOnInit(): void {
		this.selectedRadarDataItem$ = combineLatest([this.radarViewFacadeSevice.radarDataItems$, this.selectedRadarDataItemId$]).pipe(
			map(([radarDataItems, id]: [RadarDataItem[], string]) => {
				return radarDataItems.find((radarDataItem: RadarDataItem) => radarDataItem.id === id);
			})
		);

		this.selectedRadarDataItemContent$ = this.selectedRadarDataItem$.pipe(
			map((selectedItem: RadarDataItem) => {
				const HTMLString: string = selectedItem.content;
				return this.sanitizer.bypassSecurityTrustHtml(HTMLString);
			})
		);
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
}
