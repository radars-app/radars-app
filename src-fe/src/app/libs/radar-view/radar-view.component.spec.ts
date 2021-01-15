import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { RadarViewComponent } from './radar-view.component';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { of } from 'rxjs';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconService } from '../common-components/icon/service/icon.service';
import { HttpClientModule } from '@angular/common/http';
import { RadarChartLegendComponent } from './components/radar-chart-legend/radar-chart-legend.component';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RadarViewFacadeService } from './service/radar-view-facade.service';
import { SectorToColorConverterService } from './service/sector-to-color-converter.service';
import { ZoomInOutPanelComponent } from './components/zoom-in-out-panel/zoom-in-out-panel.component';
import { DotTooltipComponent } from './components/dot-tooltip/dot-tooltip.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DeleteRadarConfirmationDialogComponent } from './components/delete-radar-confirmation-dialog/delete-radar-confirmation-dialog.component';

describe('RadarViewComponent', () => {
	let component: RadarViewComponent;
	let fixture: ComponentFixture<RadarViewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				RadarViewComponent,
				SideNavigationComponent,
				RadarChartLegendComponent,
				RadarChartComponent,
				ZoomInOutPanelComponent,
				DotTooltipComponent,
				DeleteRadarConfirmationDialogComponent,
			],
			providers: [
				{
					provide: SectorToColorConverterService,
					useValue: {
						getColorBySector: jasmine.createSpy().and.returnValue('#123123'),
					},
				},
				{
					provide: ContainerFacadeService,
					useValue: {
						theme$: of(ComponentTheme.Light),
					},
				},
				{
					provide: ActivatedRoute,
					useValue: {
						paramMap: of(
							convertToParamMap({
								id: '1',
							})
						),
					},
				},
				{
					provide: RadarViewFacadeService,
					useValue: {
						radars$: of([
							{
								id: '1',
								name: 'Radar1',
								lastUpdatedDate: '12/1/2020',
								config: {
									name: 'Radar1',
									csv: 'string',
									rings: [],
									sectors: [],
								},
								sectors: ['OS', 'Hardware', 'Cloud'],
								rings: ['Trial', 'Hold', 'Acceptance'],
							},
						]),
						radarDataItems$: of([
							{
								id: '3a4dbe90-5a2c-4c81-93ea-22039a921931',
								name: 'Linux',
								ring: 'Hold',
								sector: 'OS',
								content: `Content 1 <a href="//mysite.com">Test, with comma</a>`,
								number: 1,
							},
						]),
						filteredRadarDataItems$: of([
							{
								id: '3a4dbe90-5a2c-4c81-93ea-22039a921931',
								name: 'Linux',
								ring: 'Hold',
								sector: 'OS',
								content: `Content 1 <a href="//mysite.com">Test, with comma</a>`,
								number: 1,
							},
						]),
						loadRadars: jasmine.createSpy().and.stub(),
					},
				},
			],
			imports: [CommonComponentsModule, BrowserAnimationsModule, HttpClientModule, RouterTestingModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(RadarViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
