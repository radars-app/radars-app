import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { RadarChartConfig, RadarChartModel, RadarChartRenderer } from 'radar-chart-project';
import { RadarDot } from 'radar-chart-project/dist/models/radar-dot';
import { BehaviorSubject } from 'rxjs';
import { Radar } from 'src/app/libs/radar-view/model/radar';
import { RadarDataItem } from 'src/app/libs/radar-view/model/radar-data-item';
import { Ring } from 'src/app/libs/radar-view/model/ring';
import { Sector } from 'src/app/libs/radar-view/model/sector';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from '../../../container/service/container-facade.service';

@Component({
	selector: 'app-general-radar-chart',
	templateUrl: './general-radar-chart.component.html',
	styleUrls: ['./general-radar-chart.component.scss'],
})
export class GeneralRadarChartComponent implements OnInit, AfterViewInit, OnChanges {
	@ViewChild('chartRoot', { static: false }) public chartRoot: ElementRef<SVGElement>;
	@ViewChild('chartContainer', { static: false }) public chartContainer: ElementRef<HTMLDivElement>;

	@Input()
	public radar: Radar;

	public config$: BehaviorSubject<RadarChartConfig>;
	public model: RadarChartModel;

	constructor(public containerFacade: ContainerFacadeService) {
		this.model = new RadarChartModel();
	}

	public ngOnInit(): void {
		this.handleThemeChange();
	}

	public ngOnChanges(): void {
		if (Boolean(this.radar)) {
			this.initChartModel();
		}
	}

	public ngAfterViewInit(): void {
		const size$: BehaviorSubject<{ width: number; height: number }> = new BehaviorSubject({
			width: this.chartContainer.nativeElement.clientWidth,
			height: this.chartContainer.nativeElement.clientHeight,
		});

		const renderer: RadarChartRenderer = new RadarChartRenderer(this.chartRoot.nativeElement, this.model, this.config$, size$);
		renderer.start();
	}

	private initChartModel(): void {
		this.model.isZoomEnabled.next(false);

		this.model.ringNames$.next(this.radar.rings.map((ring: Ring) => ring.label));
		const sectors: any[] = this.radar.sectors.map((sector: Sector) => {
			return {
				name: sector.label,
				color: sector.color,
			};
		});
		this.model.sectors$.next(sectors.reverse());
		this.model.dots$.next(this.mapItemsToDots(this.radar.items));
	}

	private handleThemeChange(): void {
		const lightConfig: RadarChartConfig = new RadarChartConfig();
		const darkConfig: RadarChartConfig = new RadarChartConfig();

		this.adjustCommonConfig(lightConfig, darkConfig);

		const lightThemeLinesColor: string = '#99a6b5';
		lightConfig.backgroundColor = '#ffffff';
		lightConfig.ringsConfig.ringsColor = lightThemeLinesColor;
		lightConfig.dividersConfig.dividerColor = lightThemeLinesColor;

		const darkThemeLineColor: string = '#5E6670';
		darkConfig.backgroundColor = '#2D3443';
		darkConfig.ringsConfig.ringsColor = darkThemeLineColor;
		darkConfig.dividersConfig.dividerColor = darkThemeLineColor;

		this.config$ = new BehaviorSubject<RadarChartConfig>(lightConfig);

		this.containerFacade.theme$.subscribe((theme: ComponentTheme) => {
			if (theme === ComponentTheme.Light) {
				this.config$.next(lightConfig);
			} else {
				this.config$.next(darkConfig);
			}
		});
	}

	private adjustCommonConfig(...configs: RadarChartConfig[]): void {
		configs.forEach((config: RadarChartConfig) => {
			const strokeWidth: number = 3.4;
			config.ringsConfig.strokeWidth = strokeWidth;
			config.dividersConfig.strokeWidth = strokeWidth;
			config.marginLeftRight = 2;
			config.marginTopBottom = 2;
			config.offsetLeft = 0;
			config.offsetRight = 0;
			config.ringsConfig.labelsConfig.isLabelShown = false;
			config.dotsConfig.hasClickAction = false;
			config.dotsConfig.hasHoverAction = false;
			config.dotsConfig.isNumberShown = false;
		});
	}

	private mapItemsToDots(items: RadarDataItem[]): RadarDot[] {
		return items.map((item: RadarDataItem) => {
			return {
				id: item.name,
				name: item.name,
				sector: item.sector.label,
				ring: item.ring.label,
				content: item.content,
				number: item.number,
			};
		});
	}
}
