import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
import { SectorToColorConverterService } from '../../service/sector-to-color-converter.service';

import { SideNavigationComponent } from './side-navigation.component';

describe('SideNavigationComponent', () => {
	let component: SideNavigationComponent;
	let fixture: ComponentFixture<SideNavigationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SideNavigationComponent],
			providers: [
				{
					provide: ContainerFacadeService,
					useValue: {
						theme$: of(ComponentTheme.Light),
					},
				},
				{
					provide: RadarViewFacadeService,
					useValue: {
						radars$: of([
							{
								id: '1',
								name: 'Radar1',
								lastUpdatedDate: new Date(),
								config: {
									name: 'Radar1',
									csv: 'string',
									rings: [],
									sectors: [],
								},
								sectors: ['OS', 'Hardware', 'Cloud'],
								rings: ['Trial', 'Hold', 'Acceptance'],
							},
						]),
						radarDataItems$: of([
							{
								id: '3a4dbe90-5a2c-4c81-93ea-22039a921931',
								name: 'Linux',
								ring: 'Hold',
								sector: 'OS',
								content: `Content 1 <a href="//mysite.com">Test, with comma</a`,
								number: 1,
							},
						]),
						filteredRadarDataItems$: of([
							{
								id: '3a4dbe90-5a2c-4c81-93ea-22039a921931',
								name: 'Linux',
								ring: 'Hold',
								sector: 'OS',
								content: `Content 1 <a href="//mysite.com">Test, with comma</a>`,
								number: 1,
							},
						]),
					},
				},
				{
					provide: SectorToColorConverterService,
					useValue: {
						getColorBySector: jasmine.createSpy().and.returnValue('#123123'),
					},
				},
			],
			imports: [CommonComponentsModule, BrowserAnimationsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SideNavigationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
