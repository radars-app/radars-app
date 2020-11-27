import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';
import { IconService } from 'src/app/libs/common-components/icon/service/icon.service';

import { RadarChartLegendComponent } from './radar-chart-legend.component';

describe('RadarChartLegendComponent', () => {
	let component: RadarChartLegendComponent;
	let fixture: ComponentFixture<RadarChartLegendComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RadarChartLegendComponent],
			imports: [CommonComponentsModule, HttpClientModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(RadarChartLegendComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
