import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarHeaderComponent } from './radar-header.component';

describe('RadarHeaderComponent', () => {
	let component: RadarHeaderComponent;
	let fixture: ComponentFixture<RadarHeaderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RadarHeaderComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RadarHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
