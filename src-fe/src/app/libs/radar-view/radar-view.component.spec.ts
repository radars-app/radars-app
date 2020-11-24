import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarViewComponent } from './radar-view.component';

describe('RadarViewComponent', () => {
	let component: RadarViewComponent;
	let fixture: ComponentFixture<RadarViewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RadarViewComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RadarViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
