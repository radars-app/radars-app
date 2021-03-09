import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { DropZoneComponent } from '../drop-zone/drop-zone.component';
import { ModalWindowComponent } from '../modal-window/modal-window.component';

@Component({
	selector: 'app-upload-csv-dialog',
	templateUrl: './upload-csv-dialog.component.html',
	styleUrls: ['./upload-csv-dialog.component.scss'],
})
export class UploadCsvDialogComponent implements OnInit {
	@ViewChild('popover', { static: true })
	public readonly popover: ModalWindowComponent;

	@ViewChild('dropZone', { static: true })
	public readonly dropZone: DropZoneComponent;

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Output()
	public csvUploaded: EventEmitter<string> = new EventEmitter<string>();

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
			const csv: string = reader.result as string;

			this.csvUploaded.next(csv);
			this.close();
		};
	}

	private deleteFile(): void {
		this.dropZone.deleteFile();
	}
}
