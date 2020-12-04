import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PopoverComponent } from '../../../common-components/popover/popover.component';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Radar } from '../../model/radar';
import { IconSize } from '../../../common-components/icon/models/icon-size.enum';

@Component({
	selector: 'app-radars-edit-dialog',
	templateUrl: './edit-dialog.component.html',
	styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
	@ViewChild('radarsPopover', { static: true })
	public readonly radarsPopover: PopoverComponent;

	@Input() public theme: ComponentTheme = ComponentTheme.Light;

	public radarsURI$: Observable<SafeUrl>;

	public radarName$: Observable<string>;

	public files: File[] = [];

	public deletFileIconSize: IconSize = IconSize.XSS;

	public fileIconSize: IconSize = IconSize.M;

	constructor(private radarViewFacadeSevice: RadarViewFacadeService, private sanitizer: DomSanitizer) {}

	public ngOnInit(): void {
		this.radarsURI$ = this.radarViewFacadeSevice.radars$.pipe(
			map((activeRadars: Radar[]) => {
				const theJSON: string = JSON.stringify(activeRadars);
				const blob: Blob = new Blob([theJSON], { type: 'text/json' });
				const url: string = window.URL.createObjectURL(blob);
				const uri: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);

				return uri;
			})
		);

		this.radarName$ = this.radarViewFacadeSevice.radars$.pipe(
			map((activeRadars: Radar[]) => {
				if (activeRadars) {
					return activeRadars[0]?.name;
				}
			})
		);
	}

	public open(): void {
		this.radarsPopover.open();
	}

	public updateRadar(): void {
		const reader: FileReader = new FileReader();
		reader.readAsText(this.files[0]);

		reader.onload = () => {
			const parsedJSON: Radar[] = JSON.parse(reader.result as string);

			this.radarViewFacadeSevice.uploadRadar(parsedJSON);
			this.radarsPopover.close();
		};
	}

	public onFileDropped($event: File[]): void {
		this.prepareFilesList($event);
	}

	public fileBrowseHandler(files: File[]): void {
		this.prepareFilesList(files);
	}

	public deleteFile(index: number): void {
		this.files.splice(index, 1);
	}

	private prepareFilesList(files: any[]): void {
		for (const item of files) {
			item.progress = 0;
			this.files.push(item);
		}
	}
}
