import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';

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