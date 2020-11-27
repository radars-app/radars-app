import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { RadarChartConfig, RadarChartModel, RadarChartRenderer } from 'radar-chart-project';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { IconButtonModel } from '../common-components/icon-button/model/icon-button-model';
import { IconSize } from '../common-components/icon/models/icon-size.enum';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';

@Component({
	selector: 'app-radars-radar-view',
	templateUrl: './radar-view.component.html',
	styleUrls: ['./radar-view.component.scss'],
})
export class RadarViewComponent implements OnInit, AfterViewInit {
	@ViewChild('editRadarDialog', { static: true }) public readonly editRadarDialog: EditDialogComponent;

	public buttons: IconButtonModel[];

	public theme$: Observable<ComponentTheme> = this.containerFacadeService.theme$;

	constructor(private containerFacadeService: ContainerFacadeService) {}

	public ngOnInit(): void {
		this.initCommandButtons();
	}

	public ngAfterViewInit(): void {
		this.showRadarChartExample();
	}

	private showRadarChartExample(): void {
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
				width: document.body.clientWidth - 17,
				height: window.innerHeight,
			});
		};

		const renderer: RadarChartRenderer = new RadarChartRenderer(document.querySelector('svg.radar-chart'), model, config$, size$);
		renderer.start();
	}

	private initCommandButtons(): void {
		const printButton: IconButtonModel = {
			label: 'Print Radar',
			callback: () => {},
			icon: 'print',
			iconSize: IconSize.S,
		};

		const editButton: IconButtonModel = {
			label: 'Edit',
			callback: () => {
				this.editRadarDialog.open();
			},
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
}
