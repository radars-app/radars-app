import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { SectorToColorConverterService } from '../../service/sector-to-color-converter.service';
import { RadarChartComponent } from './radar-chart.component';
import { CommonComponentsModule } from '../../../common-components/common-components.module';
import { IconService } from 'src/app/libs/common-components/icon/service/icon.service';
import { HttpClientModule } from '@angular/common/http';
import { DotTooltipComponent } from '../dot-tooltip/dot-tooltip.component';
import { ZoomInOutPanelComponent } from '../zoom-in-out-panel/zoom-in-out-panel.component';

describe('RadarChartComponent', () => {
	let component: RadarChartComponent;
	let fixture: ComponentFixture<RadarChartComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [RadarChartComponent, ZoomInOutPanelComponent, DotTooltipComponent],
			imports: [CommonComponentsModule, HttpClientModule],
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
						filteredRadarDataItems$: of([]),
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

		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(RadarChartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
