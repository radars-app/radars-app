import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from '../../service/container-facade.service';

import { ProfilePopupComponent } from './profile-popup.component';

describe('ProfilePopupComponent', () => {
	let component: ProfilePopupComponent;
	let fixture: ComponentFixture<ProfilePopupComponent>;
	let containerFacadeService: ContainerFacadeService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProfilePopupComponent],
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
			imports: [CommonComponentsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		containerFacadeService = TestBed.inject(ContainerFacadeService);
		fixture = TestBed.createComponent(ProfilePopupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when toggle theme called', () => {
		describe('with true', () => {
			beforeEach(() => {
				component.toggleTheme(true);
			});

			it('sets dark theme', () => {
				expect(containerFacadeService.setTheme).toHaveBeenCalledWith(ComponentTheme.Dark);
			});
		});

		describe('with false', () => {
			beforeEach(() => {
				component.toggleTheme(false);
			});

			it('sets light theme', () => {
				expect(containerFacadeService.setTheme).toHaveBeenCalledWith(ComponentTheme.Light);
			});
		});
	});
});
