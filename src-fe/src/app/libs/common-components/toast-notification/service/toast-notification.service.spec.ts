import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { ToastNotificationComponent } from '../toast-notification.component';

import { ToastNotificationService } from './toast-notification.service';

describe('ToastNotificationService', () => {
	let service: ToastNotificationService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				ToastrModule.forRoot({
					toastComponent: ToastNotificationComponent,
				}),
			],
		});
		service = TestBed.inject(ToastNotificationService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
