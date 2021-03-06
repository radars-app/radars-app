import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DotAction, RadarChartConfig, RadarChartModel, RadarChartRenderer } from 'radar-chart-project';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';
import { Radar } from '../../model/radar';
import { RadarDataItem } from '../../model/radar-data-item';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { TooltipOptions } from '../../../common-components/tooltip/models/tooltip-options';
import { TooltipComponent } from '../../../common-components/tooltip/tooltip.component';
import { TooltipTrigger } from '../../../common-components/tooltip/models/tooltip-trigger';
import { TooltipPlacement } from '../../../common-components/tooltip/models/tooltip-placement';
import { EventEmitter } from '@angular/core';
import { RadarDot } from 'radar-chart-project/dist/models/radar-dot';
import { Ring } from '../../model/ring';
import { Sector } from '../../model/sector';

@Component({
	selector: 'app-radar-chart',
	templateUrl: './radar-chart.component.html',
	styleUrls: ['./radar-chart.component.scss'],
})
export class RadarChartComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('chartRoot', { static: false }) public chartRoot: ElementRef<SVGElement>;
	@ViewChild(TooltipComponent, { static: false }) public tooltipComponent: TooltipComponent;

	@Output() public dotClicked: EventEmitter<DotAction> = new EventEmitter<DotAction>();

	public tooltipOptions: TooltipOptions;
	public tooltipItems: RadarDot[];

	public config$: BehaviorSubject<RadarChartConfig>;
	public radar$: Observable<Radar>;
	public model: RadarChartModel;

	private destroy$: Subject<void>;
	private items: RadarDataItem[];

	public get firstTooltipItem(): RadarDataItem {
		return this.items?.find((item: RadarDataItem) => item.name === this.tooltipItems?.['0'].name);
	}

	constructor(public containerFacade: ContainerFacadeService, private radarViewFacade: RadarViewFacadeService) {}

	public ngOnInit(): void {
		this.destroy$ = new Subject<void>();
		this.radar$ = this.radarViewFacade.radar$.pipe(
			filter((radar: Radar) => Boolean(radar)),
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
		this.model.zoomIn();
	}

	public zoomOut(): void {
		this.model.zoomOut();
	}

	public zoomReset(): void {
		this.model.zoomReset();
	}

	public isSingleItem(items: RadarDot[]): boolean {
		return items?.length === 1;
	}

	private handleModelChange(): void {
		this.model = new RadarChartModel();

		this.radar$.pipe(takeUntil(this.destroy$)).subscribe((radar: Radar) => {
			this.model.ringNames$.next(radar.rings.map((ring: Ring) => ring.label));
			const sectors: any[] = radar.sectors.map((sector: Sector) => {
				return {
					name: sector.label,
					color: sector.color,
				};
			});
			this.model.sectors$.next(sectors.reverse());
		});

		const minDotRenderInterval: number = 200;
		this.radarViewFacade.filteredRadarDataItems$
			.pipe(
				takeUntil(this.destroy$),
				tap((items: RadarDataItem[]) => {
					this.items = items;
				}),
				debounceTime(minDotRenderInterval)
			)
			.subscribe((items: RadarDataItem[]) => {
				if (Boolean(items)) {
					this.model.dots$.next(this.mapItemsToDots(items));
				}
			});

		this.model.dotHovered$.subscribe((dotAction: DotAction) => {
			if (this.isSingleItem(dotAction.items)) {
				this.tooltipItems = dotAction.items;
				this.tooltipOptions = {
					target: dotAction.target as HTMLElement,
					placement: TooltipPlacement.Top,
					trigger: [TooltipTrigger.OnHover],
					delay: '0.3s',
				};
				this.tooltipComponent.isTooltipVisible.next(true);
			}
		});

		this.model.dotClicked$.subscribe((dotAction: DotAction) => {
			this.dotClicked.emit(dotAction);
		});

		this.model.zoomed$.subscribe(() => {
			this.tooltipComponent.positioner?.forceUpdate();
		});
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
		const secondaryColor: string = '#272C39';
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

	private mapItemsToDots(items: RadarDataItem[]): RadarDot[] {
		return items.map((item: RadarDataItem) => {
			return {
				id: item.name,
				name: item.name,
				sector: item.sector.label,
				ring: item.ring.label,
				content: item.content,
				number: item.number,
				status: item.status as any,
			};
		});
	}
}
