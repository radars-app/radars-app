import {
	Component,
	AfterViewInit,
	Input,
	ViewChild,
	TemplateRef,
	ChangeDetectorRef,
	Output,
	EventEmitter,
	ChangeDetectionStrategy,
} from '@angular/core';
import { Radar } from 'src/app/libs/radar-view/model/radar';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';
import { DropZoneComponent } from '../../../common-components/drop-zone/drop-zone.component';
import { RadioGroupOption } from '../../../common-components/radio-group/models/radio-group-option';
import { RadioGroupComponent } from '../../../common-components/radio-group/radio-group.component';

@Component({
	selector: 'app-prepare-radar',
	templateUrl: './prepare-radar.component.html',
	styleUrls: ['./prepare-radar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrepareRadarComponent implements AfterViewInit {
	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@ViewChild(RadioGroupComponent, { static: true })
	public radioGroupComponent: RadioGroupComponent;

	@Input()
	public radar: Radar;

	@ViewChild('dataUrlTemplate')
	public dataUrlTemplate: TemplateRef<any>;

	@ViewChild('dropZone', { static: true })
	public readonly dropZone: DropZoneComponent;

	@Output()
	public radarChange: EventEmitter<Radar> = new EventEmitter<Radar>();

	public prepareRadarOptions: RadioGroupOption[];

	public csvFile: File;

	public get isTextInputEnabled(): boolean {
		return this.radioGroupComponent?.value === this.prepareRadarOptions[0].value;
	}

	public get isDropZoneEnabled(): boolean {
		return this.radioGroupComponent?.value === this.prepareRadarOptions[1].value;
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	constructor(private cdRef: ChangeDetectorRef) {}

	public ngAfterViewInit(): void {
		this.initPrepareRadarSection();
	}

	public updateRadarName(name: string): void {
		this.radar.name = name;
		this.radarChange.next(this.radar);
	}

	public updateCsv(file: File): void {
		const reader: FileReader = new FileReader();

		reader.readAsText(file);

		reader.onload = () => {
			const csv: string = reader.result as string;

			this.radar.csv = csv;
			this.radarChange.next(this.radar);
		};
	}

	private initPrepareRadarSection(): void {
		this.prepareRadarOptions = [
			{
				title: 'Take data from SharePoint',
				value: 1,
				template: this.dataUrlTemplate,
				disabled: true,
			},
			{
				title: 'Take data by uploading .CSV file',
				value: 2,
			},
		];
		this.cdRef.detectChanges();
	}
}
