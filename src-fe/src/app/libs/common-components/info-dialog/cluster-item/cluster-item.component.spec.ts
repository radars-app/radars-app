import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RadarDataItem } from 'src/app/libs/radar-view/model/radar-data-item';
import { Ring } from 'src/app/libs/radar-view/model/ring';
import { Sector } from 'src/app/libs/radar-view/model/sector';
import { RadarViewFacadeService } from '../../../radar-view/service/radar-view-facade.service';
import { RingToIconConverterService } from '../../../radar-view/service/ring-to-icon-converter.service';
import { CommonComponentsModule } from '../../common-components.module';
import { IconService } from '../../icon/service/icon.service';

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
					provide: RingToIconConverterService,
					useValue: {
						getIconClassByRing: jasmine.createSpy().and.returnValue('ring_legend_base'),
					},
				},
				{
					provide: RadarViewFacadeService,
					useValue: {
						radar$: of({}),
						loadRadar: jasmine.createSpy(),
					},
				},
			],
		}).compileComponents();

		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();

		fixture = TestBed.createComponent(ClusterItemComponent);
		component = fixture.componentInstance;
		component.dot = {
			name: 'TEST',
			sector: {} as Sector,
			ring: {} as Ring,
			content: '',
			number: 1,
		} as RadarDataItem;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
