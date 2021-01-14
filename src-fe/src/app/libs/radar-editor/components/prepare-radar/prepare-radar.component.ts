import {
	Component,
	AfterViewInit,
	Input,
	ViewChild,
	TemplateRef,
	ChangeDetectorRef,
	Output,
	EventEmitter,
	SimpleChanges,
	OnChanges,
	ChangeDetectionStrategy,
} from '@angular/core';
import { RadarConfig } from 'src/app/libs/radar-view/model/radar-config';
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
export class PrepareRadarComponent implements OnChanges, AfterViewInit {
	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@ViewChild(RadioGroupComponent, { static: true })
	public radioGroupComponent: RadioGroupComponent;

	@Input()
	public config: RadarConfig;

	@ViewChild('dropZoneTemplate')
	public dropZoneTemplate: TemplateRef<any>;

	@ViewChild('dataUrlTemplate')
	public dataUrlTemplate: TemplateRef<any>;

	@ViewChild('dropZone', { static: true })
	public readonly dropZone: DropZoneComponent;

	@Output()
	public configChange: EventEmitter<RadarConfig> = new EventEmitter<RadarConfig>();

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

	public ngOnChanges(changes: SimpleChanges): void {
		if (Boolean(changes.config) && Boolean(this.config.csv)) {
			this.csvFile = this.generateCsvFileFromString(this.config.csv);
		}
	}

	public ngAfterViewInit(): void {
		this.initPrepareRadarSection();
		if (Boolean(this.config.csv)) {
			this.csvFile = this.generateCsvFileFromString(this.config.csv);
		}
	}

	public updateRadarName(name: string): void {
		this.config.name = name;
		this.configChange.next(this.config);
	}

	public updateCsv(file: File): void {
		const reader: FileReader = new FileReader();

		reader.readAsText(file);

		reader.onload = () => {
			const csv: string = reader.result as string;

			this.config.csv = csv;
			this.configChange.next(this.config);
		};
	}

	private generateCsvFileFromString(csv: string): File {
		const blob: Blob = new Blob([csv], { type: '.csv' });
		const fileName: string = `${this.config.name.trim().replace(/\s/g, '_').toLowerCase()}.scv`;
		return new File([blob], fileName);
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
				template: this.dropZoneTemplate,
			},
		];
		this.cdRef.detectChanges();
	}
}
