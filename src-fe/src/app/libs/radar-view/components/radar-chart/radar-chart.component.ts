import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RadarChartConfig, RadarChartModel, RadarChartRenderer } from 'radar-chart-project';
import { BehaviorSubject } from 'rxjs';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';

import { RadarDataItem } from '../../model/radar-data-item';
import { SECTOR_COLORS } from '../../model/sector-colors';

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
		this.model.ringNames$.next(['Acceptance', 'Trial', 'Hold', 'Archive']);
		this.model.sectors$.next(
			[
				{
					name: 'OS',
					color: SECTOR_COLORS['0'],
				},
				{
					name: 'Hardware',
					color: SECTOR_COLORS['1'],
				},
				{
					name: 'Devices',
					color: SECTOR_COLORS['3'],
				},
				{
					name: 'Platforms',
					color: SECTOR_COLORS['4'],
				},
				{
					name: 'Cloud',
					color: SECTOR_COLORS['2'],
				},
			].reverse()
		);

		const dots: RadarDataItem[] = [
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Hardware',
				ring: 'Archive',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 266,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Platforms',
				ring: 'Trial',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 2,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Devices',
				ring: 'Trial',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 3,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'OS',
				ring: 'Trial',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 4,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'OS',
				ring: 'Trial',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 5,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Devices',
				ring: 'Archive',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 6,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Devices',
				ring: 'Archive',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 7,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Devices',
				ring: 'Archive',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 8,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Devices',
				ring: 'Archive',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 9,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Platforms',
				ring: 'Trial',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 10,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Platforms',
				ring: 'Trial',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 11,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Platforms',
				ring: 'Trial',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 12,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Platforms',
				ring: 'Trial',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 13,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Platforms',
				ring: 'Trial',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 14,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Platforms',
				ring: 'Trial',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 15,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Cloud',
				ring: 'Hold',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 16,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Cloud',
				ring: 'Hold',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 17,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Cloud',
				ring: 'Hold',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 18,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Cloud',
				ring: 'Hold',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 19,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Cloud',
				ring: 'Trial',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 20,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'OS',
				ring: 'Hold',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 21,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Cloud',
				ring: 'Acceptance',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 22,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Cloud',
				ring: 'Archive',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 23,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Cloud',
				ring: 'Archive',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 24,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Cloud',
				ring: 'Archive',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 25,
			},
			{
				id: 'test0',
				radarId: '1',
				versionId: 'test0',
				name: 'Linux',
				sector: 'Cloud',
				ring: 'Acceptance',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 26,
			},
			{
				id: 'test1',
				radarId: '1',
				versionId: 'test1',
				name: 'Linux',
				sector: 'Hardware',
				ring: 'Trial',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 27,
			},
			{
				id: 'test2',
				radarId: '1',
				versionId: 'test2',
				name: 'Linux',
				sector: 'OS',
				ring: 'Hold',
				content: 'Content test <a href="mysite.com">Test, with comma</a>',
				number: 28,
			},
			{
				id: '68187c54-d20c-43f2-88ba-5f8d05cd1ea6',
				radarId: '1',
				versionId: '7cf3cf5a-bde0-4005-a73b-891f16a6a692',
				name: 'Linux',
				sector: 'OS',
				ring: 'Hold',
				content: 'Content 1 <a href="mysite.com">Test, with comma</a>',
				number: 29,
			},
			{
				id: 'fb06786a-1f73-4de5-9da3-d26887a492d1',
				radarId: '1',
				versionId: '7cf3cf5a-bde0-4005-a73b-891f16a6a692',
				name: 'Nano-computing',
				sector: 'Hardware',
				ring: 'Trial',
				content: 'Content 2 <a href="mysite.com">Test</a>',
				number: 30,
			},
			{
				id: '5120a3f7-080a-4941-a864-326efe5e35b8',
				radarId: '1',
				versionId: '7cf3cf5a-bde0-4005-a73b-891f16a6a692',
				name: 'Magic',
				sector: 'Cloud',
				ring: 'Trial',
				content: 'Content 3 <a href="mysite.com">Test</a>',
				number: 31,
			},
			{
				id: '5850456f-debf-4209-b351-e1d48e3f8f3e',
				radarId: '1',
				versionId: '7cf3cf5a-bde0-4005-a73b-891f16a6a692',
				name: 'Wizards',
				sector: 'Cloud',
				ring: 'Acceptance',
				content: 'Content 3 <a href="mysite.com">Test</a>',
				number: 32,
			},
			{
				id: '0642cca9-e84a-4962-af06-8a40d0ba9cd1',
				radarId: '1',
				versionId: '7cf3cf5a-bde0-4005-a73b-891f16a6a692',
				name: 'Windows X',
				sector: 'OS',
				ring: 'Acceptance',
				content: 'Content 3 <a href="mysite.com">Test</a>',
				number: 33,
			},
		];
		this.model.dots$.next(dots);
	}

	private handleThemeChange(): void {
		const lightConfig: RadarChartConfig = new RadarChartConfig();
		const darkConfig: RadarChartConfig = new RadarChartConfig();
		const primaryFontFamily: string = "'Roboto Regular', sans-serif";

		lightConfig.ringsConfig.labelsConfig.fontFamily = primaryFontFamily;
		lightConfig.dotsConfig.numberFontFamily = primaryFontFamily;

		const primaryColor: string = '#5E6670';
		const secondaryColor: string = '#2D3443';
		darkConfig.backgroundColor = secondaryColor;
		darkConfig.ringsConfig.ringsColor = primaryColor;
		darkConfig.ringsConfig.labelsConfig.textColor = primaryColor;
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
