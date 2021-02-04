import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommonComponentsModule } from '../../../../common-components/common-components.module';
import { IconService } from '../../../../common-components/icon/service/icon.service';
import { RadarViewFacadeService } from '../../../service/radar-view-facade.service';
import { RingToIconConverterService } from '../../../service/ring-to-icon-converter.service';
import { SectorToColorConverterService } from '../../../service/sector-to-color-converter.service';

import { ClusterItemComponent } from './cluster-item.component';

describe('ClusterItemComponent', () => {
	let component: ClusterItemComponent;
	let fixture: ComponentFixture<ClusterItemComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ClusterItemComponent],
			imports: [CommonComponentsModule, HttpClientModule],
			providers: [
				{
					provide: SectorToColorConverterService,
					useValue: {
						getColorBySector: jasmine.createSpy().and.returnValue('#123123'),
					},
				},
				{
					provide: RingToIconConverterService,
					useValue: {
						getIconClassByRing: jasmine.createSpy().and.returnValue('ring_legend_base'),
					},
				},
				{
					provide: RadarViewFacadeService,
					useValue: {
						radars$: of([{ config: {} }]),
						radarDataItems$: of([]),
						loadRadars: jasmine.createSpy(),
					},
				},
			],
		}).compileComponents();

		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();

		fixture = TestBed.createComponent(ClusterItemComponent);
		component = fixture.componentInstance;
		component.dot = {
			id: '1',
			name: 'TEST',
			sector: 'TEST',
			ring: '',
			content: '',
			number: 1,
		};
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
