import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { RingToIconConverterService } from '../../service/ring-to-icon-converter.service';
import { SectorToColorConverterService } from '../../service/sector-to-color-converter.service';

import { DotTooltipComponent } from './dot-tooltip.component';

describe('DotTooltipComponent', () => {
	let component: DotTooltipComponent;
	let fixture: ComponentFixture<DotTooltipComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [DotTooltipComponent],
			providers: [
				RingToIconConverterService,
				SectorToColorConverterService,
				{
					provide: RadarViewFacadeService,
					useValue: {
						radars$: of([{ lastUpdatedAt: new Date(), sectors: [], rings: [] }]),
						radarDataItems$: of([]),
						filteredRadarDataItems$: of([]),
					},
				},
			],
		}).compileComponents();
		fixture = TestBed.createComponent(DotTooltipComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
