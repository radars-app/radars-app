import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Radar } from '../../radar-view/model/radar';
import { RadarDataItem } from '../../radar-view/model/radar-data-item';
import { Ring } from '../../radar-view/model/ring';
import { Sector } from '../../radar-view/model/sector';
import { RadarViewFacadeService } from '../../radar-view/service/radar-view-facade.service';
import { RingToIconConverterService } from '../../radar-view/service/ring-to-icon-converter.service';
import { CommonComponentsModule } from '../common-components.module';
import { IconService } from '../icon/service/icon.service';

import { InfoDialogComponent } from './info-dialog.component';

describe('InfoDialogComponent', () => {
	let component: InfoDialogComponent;
	let fixture: ComponentFixture<InfoDialogComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [InfoDialogComponent],
			imports: [CommonComponentsModule, HttpClientModule],
			providers: [
				{
					provide: RadarViewFacadeService,
					useValue: {
						radar$: of({
							items: [
								{
									name: 'Linux',
									ring: { label: 'Hold' } as Ring,
									sector: { label: 'OS' } as Sector,
									content: `Content 1 <a href='//mysite.com'>Test, with comma</a>`,
									number: 1,
								} as RadarDataItem,
							],
						} as Radar),
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
		fixture = TestBed.createComponent(InfoDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
