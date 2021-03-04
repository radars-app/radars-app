import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { IconService } from 'src/app/libs/common-components/icon/service/icon.service';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';
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
						radar$: of({
							uid: '1',
							name: 'Radar1',
							lastUpdatedSt: new Date(),
							csv: '',
							sectors: [
								{ label: 'OS', uid: 'OS', color: '1' },
								{ label: 'Hardware', uid: 'Hardware', color: '2' },
								{ label: 'Cloud', uid: 'Cloud', color: '3' },
							],
							rings: [
								{ label: 'Trial', uid: 'Trial' },
								{ label: 'Hold', uid: 'Hold' },
								{ label: 'Acceptance', uid: 'Acceptance' },
							],
							items: [
								{
									name: 'Linux',
									ring: 'Hold',
									sector: 'OS',
									content: `Content 1 <a href="//mysite.com">Test, with comma</a`,
									number: 1,
								},
							],
						}),
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
			],
			imports: [CommonComponentsModule, BrowserAnimationsModule, HttpClientModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(SideNavigationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
