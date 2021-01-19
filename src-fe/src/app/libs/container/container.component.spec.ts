import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { ToastNotificationComponent } from '../common-components/toast-notification/toast-notification.component';
import { GlobalHeaderComponent } from './components/global-header/global-header.component';
import { ProfilePopupComponent } from './components/profile-popup/profile-popup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { ContainerComponent } from './container.component';
import { ContainerFacadeService } from './service/container-facade.service';

describe('ContainerComponent', () => {
	let component: ContainerComponent;
	let fixture: ComponentFixture<ContainerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ContainerComponent, GlobalHeaderComponent, ProfilePopupComponent, UserProfileComponent],
			providers: [
				{
					provide: ContainerFacadeService,
					useValue: {
						logIn: () => {},
						loadUserPhoto: () => {},
						loadUserInfo: () => {},
						theme$: of(ComponentTheme.Light),
					},
				},
			],
			imports: [
				CommonComponentsModule,
				RouterTestingModule,
				CommonModule,
				HttpClientModule,
				ToastrModule.forRoot({
					toastComponent: ToastNotificationComponent,
				}),
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
