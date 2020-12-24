import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommonComponentsModule } from '../../../common-components/common-components.module';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from '../../../container/service/container-facade.service';
import { Radar } from '../../../radar-view/model/radar';

import { GeneralRadarChartComponent } from './general-radar-chart.component';

describe('GeneralRadarChartComponent', () => {
	let component: GeneralRadarChartComponent;
	let fixture: ComponentFixture<GeneralRadarChartComponent>;
	const radar: Radar = {
		id: '0',
		name: 'test01',
		lastUpdatedDate: new Date(),
		rings: ['ringName'],
		sectors: ['sectorName'],
		config: null,
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [GeneralRadarChartComponent],
			providers: [
				{
					provide: ContainerFacadeService,
					useValue: {
						theme$: of(ComponentTheme.Light),
					},
				},
			],
			imports: [CommonComponentsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(GeneralRadarChartComponent);
		component = fixture.componentInstance;
		component.radar = radar;
		component.radarDataItems = [];
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
