import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { IconService } from '../common-components/icon/service/icon.service';
import { RadarHeaderComponent } from '../common-components/radar-header/radar-header.component';
import { ContainerFacadeService } from '../container/service/container-facade.service';

import { RadarsGeneralViewComponent } from './radars-general-view.component';
import { RadarsGeneralViewFacadeService } from './service/radars-general-view-facade.service';
import { RadarsGeneralViewRepository } from './service/radars-general-view-repository.service';

describe('RadarsGeneralViewComponent', () => {
	let component: RadarsGeneralViewComponent;
	let fixture: ComponentFixture<RadarsGeneralViewComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [RadarsGeneralViewComponent, RadarHeaderComponent],
			providers: [
				{
					provide: ContainerFacadeService,
					useValue: {
						theme$: of(ComponentTheme.Light),
					},
				},
				{
					provide: RadarsGeneralViewFacadeService,
					useValue: {
						loadRadars: () => {},
						radars$: of([]),
					},
				},
				{
					provide: RadarsGeneralViewRepository,
					useValue: {
						loadRadarDataItems: () => [],
					},
				},
			],
			imports: [CommonComponentsModule, RouterTestingModule, BrowserAnimationsModule, HttpClientModule],
		}).compileComponents();
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(RadarsGeneralViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
