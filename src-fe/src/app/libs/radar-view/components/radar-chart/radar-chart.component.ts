import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RadarChartConfig, RadarChartModel, RadarChartRenderer } from 'radar-chart-project';
import { BehaviorSubject } from 'rxjs';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';

@Component({
	selector: 'app-radar-chart',
	templateUrl: './radar-chart.component.html',
	styleUrls: ['./radar-chart.component.scss'],
})
export class RadarChartComponent implements OnInit, AfterViewInit {
	@ViewChild('chartRoot', { static: false }) public chartRoot: ElementRef<SVGElement>;

	public config$: BehaviorSubject<RadarChartConfig>;
	public model: RadarChartModel;

	constructor(public containerFacade: ContainerFacadeService) {}

	public ngOnInit(): void {
		this.handleThemeChange();
		this.handleModelChange();
	}

	public ngAfterViewInit(): void {
		const tempTopOffset: number = 120;
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

	private handleModelChange(): void {
		this.model = new RadarChartModel();
		this.model.ringNames$.next(['Hold', 'Assess', 'Trial', 'Adopt', 'Add', 'Pad'].reverse());
		this.model.sectorNames$.next([
			'Technologies',
			'Startups',
			'Libraries',
			'Devices',
			'Languages-And-Frameworks',
			'Tools',
			'Platforms',
			'Techniques',
		]);
	}

	private handleThemeChange(): void {
		const lightConfig: RadarChartConfig = new RadarChartConfig();
		const darkConfig: RadarChartConfig = new RadarChartConfig();

		const primaryColor: string = '#5E6670';
		const secondaryColor: string = '#2D3443';
		darkConfig.backgroundColor = secondaryColor;
		darkConfig.ringsConfig.ringsColor = primaryColor;
		darkConfig.ringsConfig.labelsConfig.textColor = primaryColor;
		darkConfig.dividersConfig.dividerColor = primaryColor;

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
