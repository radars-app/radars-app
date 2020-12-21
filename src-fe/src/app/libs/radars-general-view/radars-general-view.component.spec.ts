import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from '../container/service/container-facade.service';

import { RadarsGeneralViewComponent } from './radars-general-view.component';
import { RadarsGeneralViewFacadeService } from './service/radars-general-view-facade.service';

describe('RadarsGeneralViewComponent', () => {
	let component: RadarsGeneralViewComponent;
	let fixture: ComponentFixture<RadarsGeneralViewComponent>;

	beforeEach(async(() => {
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
			],
			imports: [CommonComponentsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RadarsGeneralViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
