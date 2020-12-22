import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralRadarChartComponent } from './general-radar-chart.component';

describe('GeneralRadarChartComponent', () => {
	let component: GeneralRadarChartComponent;
	let fixture: ComponentFixture<GeneralRadarChartComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GeneralRadarChartComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GeneralRadarChartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
