import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { RadarViewComponent } from './radar-view.component';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { of } from 'rxjs';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconService } from '../common-components/icon/service/icon.service';
import { HttpClientModule } from '@angular/common/http';
import { RadarChartLegendComponent } from './components/radar-chart-legend/radar-chart-legend.component';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RadarViewFacadeService } from './service/radar-view-facade.service';

describe('RadarViewComponent', () => {
	let component: RadarViewComponent;
	let fixture: ComponentFixture<RadarViewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				RadarViewComponent,
				SideNavigationComponent,
				EditDialogComponent,
				RadarChartLegendComponent,
				RadarChartComponent,
			],
			providers: [
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
						activeRadars$: of([
							{
								id: '1',
								name: 'Radar1',
								lastUpdatedDate: '12/1/2020',
								config: {
									name: 'Radar1',
									csv: 'string',
								},
							},
						]),
						downloadRadars: () => {},
					},
				},
			],
			imports: [CommonComponentsModule, BrowserAnimationsModule, HttpClientModule],
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
