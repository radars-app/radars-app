import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotTooltipComponent } from './dot-tooltip.component';

describe('DotTooltipComponent', () => {
	let component: DotTooltipComponent;
	let fixture: ComponentFixture<DotTooltipComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DotTooltipComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DotTooltipComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
