import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarsGeneralViewComponent } from './radars-general-view.component';

describe('RadarsGeneralViewComponent', () => {
	let component: RadarsGeneralViewComponent;
	let fixture: ComponentFixture<RadarsGeneralViewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RadarsGeneralViewComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RadarsGeneralViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
