import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RadarViewFacadeService } from '../../radar-view/service/radar-view-facade.service';
import { RingToIconConverterService } from '../../radar-view/service/ring-to-icon-converter.service';
import { SectorToColorConverterService } from '../../radar-view/service/sector-to-color-converter.service';
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
						radarDataItems$: of([
							{
								id: '5690b860-f4b8-4c00-9b8d-056181b35ede',
								name: 'Linux',
								ring: 'Hold',
								sector: 'OS',
								content: `Content 1 <a href='//mysite.com'>Test, with comma</a>`,
								number: 1,
							},
						]),
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
		fixture = TestBed.createComponent(InfoDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
