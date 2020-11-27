import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';

import { RadarChartLegendComponent } from './radar-chart-legend.component';

describe('RadarChartLegendComponent', () => {
	let component: RadarChartLegendComponent;
	let fixture: ComponentFixture<RadarChartLegendComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RadarChartLegendComponent],
			imports: [CommonComponentsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RadarChartLegendComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
