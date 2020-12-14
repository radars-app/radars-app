import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { IconService } from '../../../common-components/icon/service/icon.service';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { RingToIconConverterService } from '../../service/ring-to-icon-converter.service';
import { SectorToColorConverterService } from '../../service/sector-to-color-converter.service';

import { DotTooltipComponent } from './dot-tooltip.component';
import { CommonComponentsModule } from '../../../common-components/common-components.module';

describe('DotTooltipComponent', () => {
	let component: DotTooltipComponent;
	let fixture: ComponentFixture<DotTooltipComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [DotTooltipComponent],
			imports: [CommonComponentsModule, HttpClientModule],
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

		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();

		fixture = TestBed.createComponent(DotTooltipComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
