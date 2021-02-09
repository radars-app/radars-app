import { TestBed } from '@angular/core/testing';
import { MsalService } from '@azure/msal-angular';
import { AuthRedirectInterceptor } from './auth-redirect.interceptor';

describe('AuthRedirectInterceptor', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				AuthRedirectInterceptor,
				{
					provide: MsalService,
					useValue: {
						loginRedirect: jasmine.createSpy(),
					},
				},
			],
		})
	);

	it('should be created', () => {
		const interceptor: AuthRedirectInterceptor = TestBed.inject(AuthRedirectInterceptor);
		expect(interceptor).toBeTruthy();
	});
});
