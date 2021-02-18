import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ContainerFacadeService } from '../../service/container-facade.service';
import { ProfilePopupComponent } from '../profile-popup/profile-popup.component';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
	let component: UserProfileComponent;
	let fixture: ComponentFixture<UserProfileComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserProfileComponent, ProfilePopupComponent],
			providers: [
				{
					provide: ContainerFacadeService,
					useValue: {
						setTheme: jasmine.createSpy(),
					},
				},
				{
					provide: Store,
					useValue: {},
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
