import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { RadarCardComponent } from './radar-card.component';

describe('RadarCardComponent', () => {
	let component: RadarCardComponent;
	let fixture: ComponentFixture<RadarCardComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RadarCardComponent],
			imports: [MatCardModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RadarCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
