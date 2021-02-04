import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonComponentsModule } from '../common-components.module';
import { TooltipOptions } from './models/tooltip-options';
import { TooltipPlacement } from './models/tooltip-placement';
import { TooltipTrigger } from './models/tooltip-trigger';

import { TooltipComponent } from './tooltip.component';

const testOptions: TooltipOptions = {
	target: document.querySelector('html'),
	placement: TooltipPlacement.Top,
	trigger: [TooltipTrigger.OnHover],
	delay: '0.3s',
};

@Component({
	template: ` <app-tooltip [options]="options"></app-tooltip> `,
})
export class TestWrapperComponent {
	@ViewChild(TooltipComponent)
	public tooltipComponent: TooltipComponent;

	public options: TooltipOptions;
}

describe('TooltipComponent', () => {
	let component: TestWrapperComponent;
	let fixture: ComponentFixture<TestWrapperComponent>;

	let options: TooltipOptions;
	let target: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TooltipComponent, TestWrapperComponent],
			imports: [CommonComponentsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(TestWrapperComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		target = document.querySelector('html') as HTMLElement;
		options = {
			target,
			placement: TooltipPlacement.Top,
			trigger: [TooltipTrigger.OnHover],
			delay: '0.3s',
		};
	});

	it('should create', () => {
		expect(component.tooltipComponent).toBeTruthy();
	});

	describe('when @Input gets options', () => {
		beforeEach(() => {
			component.options = options;
			fixture.detectChanges();
		});

		it('should set options', () => {
			expect(component.tooltipComponent.options).toBe(options);
		});
	});

	describe('when options changed', () => {
		beforeEach(() => {
			spyOn<any>(component.tooltipComponent, 'initVisibilityBehavior').and.callThrough();
			component.options = testOptions;
			fixture.detectChanges();
		});

		it('should add events to target element', () => {
			expect(component.tooltipComponent['initVisibilityBehavior']).toHaveBeenCalled();
		});
	});

	describe('when mouse over targer', () => {
		beforeEach(() => {
			component.options = testOptions;
			fixture.detectChanges();
			component.options.target.dispatchEvent(new MouseEvent('mouseenter'));
			fixture.detectChanges();
		});

		it('should show tooltip', () => {
			expect(document.querySelector('.tooltip--visible')).toBeTruthy();
		});
	});
});
