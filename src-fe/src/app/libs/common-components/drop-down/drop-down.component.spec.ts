import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { DropDownOption } from '../common/models/drop-down-option';

import { DropDownComponent } from './drop-down.component';

describe('DropDownComponent', () => {
	let component: DropDownComponent;
	let fixture: ComponentFixture<DropDownComponent>;
	let htmlElement: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DropDownComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DropDownComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		htmlElement = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when call isDarkTheme', () => {
		describe('theme is Dark', () => {
			beforeEach(() => {
				component.theme = ComponentTheme.Dark;
				fixture.detectChanges();
			});

			it('should return true', () => {
				expect(component.isDarkTheme).toBeTruthy();
			});
		});

		describe('theme is not Dark', () => {
			beforeEach(() => {
				component.theme = ComponentTheme.Light;
				fixture.detectChanges();
			});

			it('should return false', () => {
				expect(component.isDarkTheme).toBeFalsy();
			});
		});
	});

	describe('when @Input does not get theme', () => {
		it('should show light themed button', () => {
			expect(htmlElement.querySelector('.drop-down--dark-theme')).toBeNull();
		});
	});

	describe('when @Input gets options', () => {
		it('should set options', () => {
			const testOptions: DropDownOption[] = [{ name: 'test', icon: 'none', callback: () => {} }];
			component.options = testOptions;
			expect(component.options).toBe(testOptions);
		});
	});
});
