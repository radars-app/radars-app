import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RadarViewFacadeService } from '../../radar-view/service/radar-view-facade.service';
import { RingToIconConverterService } from '../../radar-view/service/ring-to-icon-converter.service';
import { SectorToColorConverterService } from '../../radar-view/service/sector-to-color-converter.service';
import { CommonComponentsModule } from '../common-components.module';
import { IconService } from '../icon/service/icon.service';

import { RingSectorDescriptionComponent } from './ring-sector-description.component';

describe('RingSectorDescriptionComponent', () => {
	let component: RingSectorDescriptionComponent;
	let fixture: ComponentFixture<RingSectorDescriptionComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [RingSectorDescriptionComponent],
			imports: [CommonComponentsModule, HttpClientModule],
			providers: [
				{
					provide: RadarViewFacadeService,
					useValue: {
						radars$: of([{ config: {} }]),
						loadRadars: jasmine.createSpy(),
					},
				},
				{
					provide: RingToIconConverterService,
					useValue: {
						getIconClassByRing: jasmine.createSpy().and.returnValue('ring_legend_base'),
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

		fixture = TestBed.createComponent(RingSectorDescriptionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
