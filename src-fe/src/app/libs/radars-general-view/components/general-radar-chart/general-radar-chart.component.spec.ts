import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Radar } from 'src/app/libs/radar-view/model/radar';
import { CommonComponentsModule } from '../../../common-components/common-components.module';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from '../../../container/service/container-facade.service';

import { GeneralRadarChartComponent } from './general-radar-chart.component';

describe('GeneralRadarChartComponent', () => {
	let component: GeneralRadarChartComponent;
	let fixture: ComponentFixture<GeneralRadarChartComponent>;
	const radarWithData: Partial<Radar> = {
		uid: '0',
		name: 'test01',
		lastUpdatedAt: new Date(),
		rings: [{ label: 'ringName', uid: 'ringName', keywords: [] }],
		sectors: [{ label: 'sectorName', uid: 'sectorName', keywords: [], color: 'gray' }],
		items: [],
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
		component.radar = radarWithData as Radar;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
