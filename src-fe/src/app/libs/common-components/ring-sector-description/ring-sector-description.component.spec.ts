import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Ring } from '../../radar-view/model/ring';
import { Sector } from '../../radar-view/model/sector';
import { RadarViewFacadeService } from '../../radar-view/service/radar-view-facade.service';
import { RingToIconConverterService } from '../../radar-view/service/ring-to-icon-converter.service';
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
						radar$: of({}),
						loadRadar: jasmine.createSpy(),
					},
				},
				{
					provide: RingToIconConverterService,
					useValue: {
						getIconClassByRing: jasmine.createSpy().and.returnValue('ring_legend_base'),
					},
				},
			],
		}).compileComponents();

		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();

		fixture = TestBed.createComponent(RingSectorDescriptionComponent);
		component = fixture.componentInstance;
		component.sector = { label: '1', color: '2' } as Sector;
		component.ring = { label: '3' } as Ring;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
