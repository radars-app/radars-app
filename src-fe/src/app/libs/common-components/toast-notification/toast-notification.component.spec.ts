import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndividualConfig, ToastPackage, ToastRef, ToastrModule, ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CommonComponentsModule } from '../common-components.module';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { IconService } from '../icon/service/icon.service';
import { ToastNotificationService } from './service/toast-notification.service';

import { ToastNotificationComponent } from './toast-notification.component';

class MockToastPackage extends ToastPackage {
	constructor() {
		const toastConfig: any = { toastClass: 'customToast' };
		super(1, <IndividualConfig>toastConfig, 'test message', 'test title', 'show', new ToastRef(null));
	}
}

describe('ToastNotificationComponent', () => {
	let component: ToastNotificationComponent;
	let fixture: ComponentFixture<ToastNotificationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ToastNotificationComponent],
			providers: [
				ToastrService,
				{
					provide: ToastPackage,
					useValue: new MockToastPackage(),
				},
			],
			imports: [
				CommonComponentsModule,
				HttpClientModule,
				BrowserAnimationsModule,
				ToastrModule.forRoot({
					toastComponent: ToastNotificationComponent,
				}),
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		ToastNotificationService.theme$ = new BehaviorSubject<ComponentTheme>(ComponentTheme.Light);
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(ToastNotificationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
