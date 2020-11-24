import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ContainerFacadeService } from '../../service/container-facade.service';

import { ProfilePopupComponent } from './profile-popup.component';

describe('ProfilePopupComponent', () => {
	let component: ProfilePopupComponent;
	let fixture: ComponentFixture<ProfilePopupComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProfilePopupComponent],
			providers: [
				{
					provide: ContainerFacadeService,
					useValue: {},
				},
				{
					provide: Store,
					useValue: {},
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProfilePopupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
