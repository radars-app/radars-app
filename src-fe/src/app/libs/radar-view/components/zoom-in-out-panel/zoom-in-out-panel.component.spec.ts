import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { IconService } from 'src/app/libs/common-components/icon/service/icon.service';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';
import { HttpClientModule } from '@angular/common/http';

import { ZoomInOutPanelComponent } from './zoom-in-out-panel.component';

describe('ZoomInOutPanelComponent', () => {
	let component: ZoomInOutPanelComponent;
	let fixture: ComponentFixture<ZoomInOutPanelComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ContainerFacadeService,
					useValue: {
						theme$: of(ComponentTheme.Light),
					},
				},
			],
			declarations: [ZoomInOutPanelComponent],
			imports: [CommonComponentsModule, HttpClientModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(ZoomInOutPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
