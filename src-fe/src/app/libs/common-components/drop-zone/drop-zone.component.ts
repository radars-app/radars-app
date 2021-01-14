import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IconSize } from '../icon/models/icon-size.enum';
import { ComponentTheme } from '../common/enum/component-theme.enum';

@Component({
	selector: 'app-drop-zone',
	templateUrl: './drop-zone.component.html',
	styleUrls: ['./drop-zone.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropZoneComponent implements OnChanges {
	@ViewChild('fileDropZone', { static: true })
	public readonly fileDropZoneRef: ElementRef;

	@Input() public theme: ComponentTheme;
	@Input() public accept: string;
	@Input() public file: File;
	@Input() public disabled: boolean;

	@Output() public fileLoaded: EventEmitter<File> = new EventEmitter<File>();

	public files$: BehaviorSubject<File[]> = new BehaviorSubject([]);
	public deleteFileIconSize: IconSize = IconSize.XSS;
	public fileIconSize: IconSize = IconSize.M;

	constructor() {}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.file) {
			this.files$.next([this.file]);
		}
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public onFileDropped($event: File[]): void {
		this.prepareFile($event[0]);
	}

	public fileBrowseHandler(file: File): void {
		this.prepareFile(file);
	}

	public deleteFile(): void {
		this.fileDropZoneRef.nativeElement.value = null;
		this.files$.next([]);
	}

	private prepareFile(file: any): void {
		if (file.progress !== undefined) {
			file.progress = 0;
		}
		this.files$.next([file]);
		this.fileLoaded.next(file);
	}
}
