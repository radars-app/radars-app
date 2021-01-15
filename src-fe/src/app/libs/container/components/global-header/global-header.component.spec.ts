import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';
import { IconService } from 'src/app/libs/common-components/icon/service/icon.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';

import { GlobalHeaderComponent } from './global-header.component';

describe('GlobalHeaderComponent', () => {
	let component: GlobalHeaderComponent;
	let fixture: ComponentFixture<GlobalHeaderComponent>;
	const defaultUrl: string = '/';
	const router: { url: string } = {
		url: defaultUrl,
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GlobalHeaderComponent, UserProfileComponent],
			imports: [CommonComponentsModule, BrowserAnimationsModule, HttpClientModule],
			providers: [
				{
					provide: Router,
					useValue: router,
				},
			],
		}).compileComponents();

		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(GlobalHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	afterEach(() => {
		router.url = defaultUrl;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when call isRootPageOpened', () => {
		describe('when routers url is `/`', () => {
			it('should return true', () => {
				expect(component.isRootPageOpened).toBe(true);
			});
		});

		describe('when routers url is not `/`', () => {
			beforeEach(() => {
				router.url = '/radars/1';
				fixture.detectChanges();
			});

			it('should return true', () => {
				expect(component.isRootPageOpened).toBe(false);
			});
		});
	});
});
