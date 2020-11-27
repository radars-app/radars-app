import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RadarChartConfig, RadarChartModel, RadarChartRenderer } from 'radar-chart-project';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccordionItem } from '../common-components/accordion/models/accordion-item.models';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { IconButtonModel } from '../common-components/icon-button/model/icon-button-model';
import { IconSize } from '../common-components/icon/models/icon-size.enum';
import { ContainerFacadeService } from '../container/service/container-facade.service';

@Component({
	selector: 'app-radars-radar-view',
	templateUrl: './radar-view.component.html',
	styleUrls: ['./radar-view.component.scss'],
})
export class RadarViewComponent implements OnInit, AfterViewInit {
	public buttons: IconButtonModel[];

	public darkTheme$: Observable<boolean> = this.containerFacadeService.theme$.pipe(
		map((theme: ComponentTheme) => theme === ComponentTheme.Dark)
	);

	public items$: Observable<AccordionItem[]> = of([
		{
			title: 'Techniques',
			opened: false,
			color: '#123123',
			children: [
				{
					title: 'Sequrity policy as code',
					id: 'SPAC1',
				},
			],
		},
		{
			title: 'Platforms',
			opened: false,
			color: 'green',
			children: [
				{
					title: 'Sequrity policy as code',
					id: 'SPAC2',
				},
			],
		},
		{
			title: 'Tools',
			opened: false,
			color: 'purple',
			children: [
				{
					title: 'Sequrity policy as code',
					id: 'SPAC3',
				},
			],
		},
		{
			title: 'Languages-And-Framworks',
			opened: false,
			color: 'yellow',
			children: [
				{
					title: 'Sequrity policy as code',
					id: 'SPAC4',
				},
			],
		},
		{
			title: 'Devices',
			opened: false,
			color: 'orange',
			children: [
				{
					title: 'Sequrity policy as code',
					id: 'SPAC5',
				},
			],
		},
		{
			title: 'Technologies',
			opened: false,
			color: 'blue',
			children: [
				{
					title: 'Sequrity policy as code',
					id: 'SPAC6',
				},
			],
		},
		{
			title: 'Startups',
			opened: false,
			color: 'violet',
			children: [
				{
					title: 'Sequrity policy as code',
					id: 'SPAC71',
				},
				{
					title: 'Sequrity policy as code',
					id: 'SPAC72',
				},
				{
					title: 'Sequrity policy as code',
					id: 'SPAC73',
				},
				{
					title: 'Sequrity policy as code',
					id: 'SPAC74',
				},
				{
					title: 'Sequrity policy as code',
					id: 'SPAC7',
				},
				{
					title: 'Sequrity policy as code',
					id: 'SPAC7',
				},
			],
		},
	]);

	constructor(private containerFacadeService: ContainerFacadeService) {}

	public ngOnInit(): void {
		const printButton: IconButtonModel = {
			label: 'Print Radar',
			callback: () => {},
			icon: 'print',
			iconSize: IconSize.S,
		};

		const editButton: IconButtonModel = {
			label: 'Edit',
			callback: () => {},
			icon: 'edit_1',
			iconSize: IconSize.S,
		};

		const removeButton: IconButtonModel = {
			label: 'Remove',
			callback: () => {},
			icon: 'delete',
			iconSize: IconSize.S,
		};

		this.buttons = [printButton, editButton, removeButton];
	}

	public ngAfterViewInit(): void {
		const model: RadarChartModel = new RadarChartModel();
		model.ringNames$.next(['Hold', 'Assess', 'Trial', 'Adopt'].reverse());
		model.sectorNames$.next([
			'Technologies',
			'Startups',
			'Libraries',
			'Devices',
			'Languages-And-Frameworks',
			'Tools',
			'Platforms',
			'Techniques',
		]);

		const lightConfig: RadarChartConfig = new RadarChartConfig();
		const darkConfig: RadarChartConfig = new RadarChartConfig();

		// dark config adjusting
		const primaryColor: string = '#5E6670';
		const secondaryColor: string = '#2D3443';
		darkConfig.backgroundColor = secondaryColor;
		darkConfig.ringsConfig.ringsColor = primaryColor;
		darkConfig.ringsConfig.labelsConfig.textColor = primaryColor;
		darkConfig.dividersConfig.dividerColor = primaryColor;

		const config$: BehaviorSubject<RadarChartConfig> = new BehaviorSubject<RadarChartConfig>(lightConfig);

		const size$: BehaviorSubject<{ width: number; height: number }> = new BehaviorSubject({
			width: document.body.clientWidth - 17,
			height: window.innerHeight,
		});

		window.onresize = ($event: Event) => {
			size$.next({
				width: 1366,
				height: 652,
			});
		};

		const renderer: RadarChartRenderer = new RadarChartRenderer(document.querySelector('svg.radar-chart'), model, config$, size$);
		renderer.start();
	}
}
