import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RadarConfig } from '../../radar-view/model/radar-config';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { DropZoneComponent } from '../drop-zone/drop-zone.component';
import { PopoverComponent } from '../popover/popover.component';

@Component({
	selector: 'app-upload-config-dialog',
	templateUrl: './upload-config-dialog.component.html',
	styleUrls: ['./upload-config-dialog.component.scss'],
})
export class UploadConfigDialogComponent implements OnInit {
	@ViewChild('popover', { static: true })
	public readonly popover: PopoverComponent;

	@ViewChild('dropZone', { static: true })
	public readonly dropZone: DropZoneComponent;

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Output()
	public configUploaded: EventEmitter<RadarConfig> = new EventEmitter<RadarConfig>();

	constructor() {}

	public ngOnInit(): void {}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public open(): void {
		this.popover.open();
	}

	public close(): void {
		this.deleteFile();
		this.popover.close();
	}

	public submitConfig(): void {
		const reader: FileReader = new FileReader();
		const attachedFiles: File[] = this.dropZone.files$.getValue();

		if (attachedFiles[0]) {
			reader.readAsText(attachedFiles[0]);
		}

		reader.onload = () => {
			const config: RadarConfig = JSON.parse(reader.result as string);

			this.configUploaded.next(config);
			this.close();
		};
	}

	private deleteFile(): void {
		this.dropZone.deleteFile();
	}
}
