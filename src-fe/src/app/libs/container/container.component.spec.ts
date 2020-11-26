import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { GlobalHeaderComponent } from './components/global-header/global-header.component';

import { ContainerComponent } from './container.component';
import { ContainerFacadeService } from './service/container-facade.service';

describe('ContainerComponent', () => {
	let component: ContainerComponent;
	let fixture: ComponentFixture<ContainerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ContainerComponent, GlobalHeaderComponent],
			providers: [
				{
					provide: ContainerFacadeService,
					useValue: {
						logIn: () => {},
						loadUserPhoto: () => {},
						loadUserInfo: () => {},
					},
				},
			],
			imports: [CommonComponentsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ContainerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
