import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RadarChartConfig, RadarChartModel, RadarChartRenderer } from 'radar-chart-project';
import { BehaviorSubject, Subject } from 'rxjs';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from '../../../container/service/container-facade.service';
import { Radar } from '../../../radar-view/model/radar';
import { RadarDataItem } from '../../../radar-view/model/radar-data-item';
import { SECTOR_COLORS } from '../../../radar-view/model/sector-colors';
import { RadarsGeneralViewRepositoryService } from '../../service/radars-general-view-repository.service';
@Component({
	selector: 'app-general-radar-chart',
	templateUrl: './general-radar-chart.component.html',
	styleUrls: ['./general-radar-chart.component.scss'],
})
export class GeneralRadarChartComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('chartRoot', { static: false }) public chartRoot: ElementRef<SVGElement>;
	@ViewChild('chartContainer', { static: false }) public chartContainer: ElementRef<HTMLDivElement>;

	@Input()
	public radar: Radar;

	@Input()
	public radarDataItems: RadarDataItem[];

	public config$: BehaviorSubject<RadarChartConfig>;
	public model: RadarChartModel;

	private destroy$: Subject<void>;

	constructor(
		public containerFacade: ContainerFacadeService,
		private radarsGeneralViewRepositoryService: RadarsGeneralViewRepositoryService
	) {}

	public ngOnInit(): void {
		this.destroy$ = new Subject<void>();
		this.handleModelChange();
		this.handleThemeChange();
	}

	public ngAfterViewInit(): void {
		const size$: BehaviorSubject<{ width: number; height: number }> = new BehaviorSubject({
			width: this.chartContainer.nativeElement.clientWidth,
			height: this.chartContainer.nativeElement.clientHeight,
		});

		const renderer: RadarChartRenderer = new RadarChartRenderer(this.chartRoot.nativeElement, this.model, this.config$, size$);
		renderer.start();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private handleModelChange(): void {
		this.model = new RadarChartModel();
		this.model.isZoomEnabled.next(false);

		this.model.ringNames$.next(this.radar.rings);
		const sectors: any[] = this.radar.sectors.map((sector: string, index: number) => {
			return {
				name: sector,
				color: SECTOR_COLORS[index],
			};
		});
		this.model.sectors$.next(sectors.reverse());
		this.model.dots$.next(this.radarDataItems);
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
			config.ringsConfig.labelsConfig.isLabelShown = false;
			config.dotsConfig.hasClickAction = false;
			config.dotsConfig.hasHoverAction = false;
			config.dotsConfig.isNumberShown = false;
		});
	}
}
