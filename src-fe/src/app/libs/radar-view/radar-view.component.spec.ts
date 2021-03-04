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
import { ZoomInOutPanelComponent } from './components/zoom-in-out-panel/zoom-in-out-panel.component';
import { DotTooltipComponent } from './components/dot-tooltip/dot-tooltip.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DeleteRadarConfirmationDialogComponent } from './components/delete-radar-confirmation-dialog/delete-radar-confirmation-dialog.component';
import { RadarHeaderComponent } from '../common-components/radar-header/radar-header.component';

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
				RadarHeaderComponent,
			],
			providers: [
				{
					provide: ContainerFacadeService,
					useValue: {
						theme$: of(ComponentTheme.Light),
						isAdmin$: of(true),
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
						radar$: of({
							uid: '1',
							name: 'Radar1',
							lastUpdatedAt: '12/1/2020',
							csv: '',
							sectors: [
								{ label: 'OS', uid: 'OS', color: '1' },
								{ label: 'Hardware', uid: 'Hardware', color: '2' },
								{ label: 'Cloud', uid: 'Cloud', color: '3' },
							],
							rings: [
								{ label: 'Trial', uid: 'Trial' },
								{ label: 'Hold', uid: 'Hold' },
								{ label: 'Acceptance', uid: 'Acceptance' },
							],
							items: [
								{
									name: 'Linux',
									ring: 'Hold',
									sector: 'OS',
									content: `Content 1 <a href="//mysite.com">Test, with comma</a>`,
									number: 1,
								},
							],
						}),
						filteredRadarDataItems$: of([
							{
								name: 'Linux',
								ring: 'Hold',
								sector: 'OS',
								content: `Content 1 <a href="//mysite.com">Test, with comma</a>`,
								number: 1,
							},
						]),
						searchQuery$: of('Linux'),
						loadRadar: jasmine.createSpy().and.stub(),
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
