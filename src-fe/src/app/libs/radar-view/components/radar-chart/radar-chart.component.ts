import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DotAction, RadarChartConfig, RadarChartModel, RadarChartRenderer } from 'radar-chart-project';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';
import { Radar } from '../../model/radar';
import { RadarDataItem } from '../../model/radar-data-item';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { SectorToColorConverterService } from '../../service/sector-to-color-converter.service';
import { TooltipOptions } from '../../../common-components/tooltip/models/tooltip-options';
import { TooltipComponent } from '../../../common-components/tooltip/tooltip.component';
import { TooltipTrigger } from '../../../common-components/tooltip/models/tooltip-trigger';
import { TooltipPlacement } from '../../../common-components/tooltip/models/tooltip-placement';
import { EventEmitter } from '@angular/core';

@Component({
	selector: 'app-radar-chart',
	templateUrl: './radar-chart.component.html',
	styleUrls: ['./radar-chart.component.scss'],
})
export class RadarChartComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('chartRoot', { static: false }) public chartRoot: ElementRef<SVGElement>;
	@ViewChild('tooltip', { static: false }) public tooltipComponent: TooltipComponent;

	@Output() public dotClicked: EventEmitter<DotAction> = new EventEmitter<DotAction>();

	public dotTooltipOptions: TooltipOptions;
	public hoveredDot: RadarDataItem;

	public config$: BehaviorSubject<RadarChartConfig>;
	public radar$: Observable<Radar>;
	public model: RadarChartModel;

	private destroy$: Subject<void>;

	constructor(
		public containerFacade: ContainerFacadeService,
		private radarViewFacade: RadarViewFacadeService,
		private sectorToColorConverter: SectorToColorConverterService
	) {}

	public ngOnInit(): void {
		this.destroy$ = new Subject<void>();
		this.radar$ = this.radarViewFacade.radars$.pipe(
			filter((radars: Radar[]) => Boolean(radars)),
			map((radars: Radar[]) => radars[radars.length - 1]),
			takeUntil(this.destroy$)
		);
		this.handleThemeChange();
		this.handleModelChange();
	}

	public ngAfterViewInit(): void {
		const tempTopOffset: number = 108;
		const size$: BehaviorSubject<{ width: number; height: number }> = new BehaviorSubject({
			width: document.body.clientWidth,
			height: document.body.clientHeight - tempTopOffset,
		});

		window.onresize = () => {
			size$.next({
				width: document.body.clientWidth,
				height: document.body.clientHeight - tempTopOffset,
			});
		};

		const renderer: RadarChartRenderer = new RadarChartRenderer(this.chartRoot.nativeElement, this.model, this.config$, size$);
		renderer.start();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public zoomIn(): void {
		this.model.zoomIn$.next();
	}

	public zoomOut(): void {
		this.model.zoomOut$.next();
	}

	private handleModelChange(): void {
		this.model = new RadarChartModel();

		this.radar$.pipe(takeUntil(this.destroy$)).subscribe((radar: Radar) => {
			this.model.ringNames$.next(radar.rings);
			const sectors: any[] = radar.sectors.map((sector: string) => {
				return {
					name: sector,
					color: this.sectorToColorConverter.getColorBySector(sector),
				};
			});
			this.model.sectors$.next(sectors.reverse());
		});

		this.radarViewFacade.filteredRadarDataItems$.pipe(takeUntil(this.destroy$)).subscribe((items: RadarDataItem[]) => {
			if (Boolean(items)) {
				this.model.dots$.next(items);
			}
		});

		this.model.dotHovered$.subscribe((dotAction: DotAction) => {
			this.hoveredDot = this.getRadarItemById(dotAction.dotId);
			this.dotTooltipOptions = {
				target: dotAction.target as HTMLElement,
				placement: TooltipPlacement.Top,
				trigger: [TooltipTrigger.OnHover],
				delay: '0.4s',
			};
			this.tooltipComponent.isTooltipVisible.next(true);
		});

		this.model.dotClicked$.subscribe((dotAction: DotAction) => {
			this.dotClicked.emit(dotAction);
		});

		this.model.zoomed$.subscribe(() => {
			this.tooltipComponent.positioner?.forceUpdate();
		});
	}

	private getRadarItemById(id: string): RadarDataItem {
		return this.model.dots$.getValue().find((radarItem: RadarDataItem) => radarItem.id === id) as RadarDataItem;
	}

	private handleThemeChange(): void {
		const lightConfig: RadarChartConfig = new RadarChartConfig();
		const darkConfig: RadarChartConfig = new RadarChartConfig();

		const primaryFontFamily: string = 'Roboto Regular, sans-serif';

		const lightThemeLinesColor: string = '#99a6b5';
		const lightThemeTextColor: string = '#272c39';

		lightConfig.ringsConfig.labelsConfig.fontFamily = primaryFontFamily;
		lightConfig.dotsConfig.numberFontFamily = primaryFontFamily;
		lightConfig.ringsConfig.labelsConfig.textColor = lightThemeTextColor;
		lightConfig.ringsConfig.ringsColor = lightThemeLinesColor;
		lightConfig.dividersConfig.dividerColor = lightThemeLinesColor;

		const primaryColor: string = '#5E6670';
		const secondaryColor: string = '#2D3443';
		const darkThemeTextColor: string = '#fff';

		darkConfig.backgroundColor = secondaryColor;
		darkConfig.ringsConfig.ringsColor = primaryColor;
		darkConfig.ringsConfig.labelsConfig.textColor = darkThemeTextColor;
		darkConfig.dividersConfig.dividerColor = primaryColor;
		darkConfig.ringsConfig.labelsConfig.fontFamily = primaryFontFamily;
		darkConfig.dotsConfig.numberFontFamily = primaryFontFamily;

		this.config$ = new BehaviorSubject<RadarChartConfig>(lightConfig);

		this.containerFacade.theme$.subscribe((theme: ComponentTheme) => {
			if (theme === ComponentTheme.Light) {
				this.config$.next(lightConfig);
			} else {
				this.config$.next(darkConfig);
			}
		});
	}
}
