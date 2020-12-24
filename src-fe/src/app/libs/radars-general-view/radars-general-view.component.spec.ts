import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from '../container/service/container-facade.service';

import { RadarsGeneralViewComponent } from './radars-general-view.component';
import { RadarsGeneralViewFacadeService } from './service/radars-general-view-facade.service';
import { RadarsGeneralViewRepository } from './service/radars-general-view-repository.service';

describe('RadarsGeneralViewComponent', () => {
	let component: RadarsGeneralViewComponent;
	let fixture: ComponentFixture<RadarsGeneralViewComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [RadarsGeneralViewComponent],
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
						radars$: of(),
					},
				},
				{
					provide: RadarsGeneralViewRepository,
					useValue: {
						loadRadarDataItems: () => [],
						radars$: of([]),
					},
				},
			],
			imports: [CommonComponentsModule, RouterTestingModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RadarsGeneralViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
