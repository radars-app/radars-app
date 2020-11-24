import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerComponent } from './container.component';
import { ContainerFacadeService } from './service/container-facade.service';

describe('ContainerComponent', () => {
	let component: ContainerComponent;
	let fixture: ComponentFixture<ContainerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ContainerComponent],
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
