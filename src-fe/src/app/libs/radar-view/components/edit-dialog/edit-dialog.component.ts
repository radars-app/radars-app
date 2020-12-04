import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PopoverComponent } from '../../../common-components/popover/popover.component';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Radar } from '../../model/radar';
import { IconSize } from '../../../common-components/icon/models/icon-size.enum';
import { RadarConfig } from '../../model/radar-config';

@Component({
	selector: 'app-radars-edit-dialog',
	templateUrl: './edit-dialog.component.html',
	styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
	@ViewChild('radarsPopover', { static: true })
	public readonly radarsPopover: PopoverComponent;

	@ViewChild('fileDropRef', { static: true })
	public readonly fileDropRef: ElementRef;

	@Input() public theme: ComponentTheme = ComponentTheme.Light;

	public radarsURI$: Observable<SafeUrl>;

	public radarName$: Observable<string>;

	public files: File[] = [];

	public deletFileIconSize: IconSize = IconSize.XSS;

	public fileIconSize: IconSize = IconSize.M;

	private radarId: string;

	constructor(private radarViewFacadeSevice: RadarViewFacadeService, private sanitizer: DomSanitizer) {}

	public ngOnInit(): void {
		this.radarsURI$ = this.radarViewFacadeSevice.radars$.pipe(
			map((activeRadars: Radar[]) => {
				if (activeRadars) {
					const lastIndex: number = activeRadars?.length - 1;
					const configJSON: string = JSON.stringify(activeRadars[lastIndex].config);
					const blob: Blob = new Blob([configJSON], { type: 'text/json' });
					const url: string = window.URL.createObjectURL(blob);
					const uri: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);

					return uri;
				}
			})
		);

		this.radarName$ = this.radarViewFacadeSevice.radars$.pipe(
			map((activeRadars: Radar[]) => {
				if (activeRadars) {
					const activeRadarsLastIndex: number = activeRadars.length - 1;
					this.radarId = activeRadars[activeRadarsLastIndex]?.id;
					return activeRadars[activeRadarsLastIndex]?.name;
				}
			})
		);
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public open(): void {
		this.radarsPopover.open();
	}

	public close(): void {
		this.files = [];
		this.radarsPopover.close();
	}

	public updateRadar(): void {
		const reader: FileReader = new FileReader();
		reader.readAsText(this.files[0]);

		reader.onload = () => {
			const parsedJSON: RadarConfig = JSON.parse(reader.result as string);

			this.radarViewFacadeSevice.uploadRadar(this.radarId, parsedJSON);
			this.close();
		};
	}

	public onFileDropped($event: File[]): void {
		this.prepareFile($event[0]);
	}

	public fileBrowseHandler(file: File): void {
		this.prepareFile(file);
	}

	public deleteFile(index: number): void {
		this.fileDropRef.nativeElement.value = null;
		this.files = [];
	}

	private prepareFile(file: any): void {
		file.progress = 0;
		this.files[0] = file;
	}
}
