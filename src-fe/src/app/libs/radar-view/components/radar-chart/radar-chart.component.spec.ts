import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { SectorToColorConverterService } from '../../service/sector-to-color-converter.service';

import { RadarChartComponent } from './radar-chart.component';

describe('RadarChartComponent', () => {
	let component: RadarChartComponent;
	let fixture: ComponentFixture<RadarChartComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RadarChartComponent],
			providers: [
				{
					provide: ContainerFacadeService,
					useValue: {
						theme$: of(ComponentTheme.Light),
					},
				},
				{
					provide: RadarViewFacadeService,
					useValue: {
						radars$: of([{ lastUpdatedAt: new Date(), sectors: [], rings: [] }]),
						radarDataItems$: of([]),
					},
				},
				{
					provide: SectorToColorConverterService,
					useValue: {
						getColorBySector: jasmine.createSpy().and.returnValue('#123123'),
					},
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RadarChartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
