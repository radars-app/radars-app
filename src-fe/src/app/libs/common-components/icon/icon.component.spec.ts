import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from './icon.component';
import { IconService } from './service/icon.service';

describe('IconComponent', () => {
	let component: IconComponent;
	let fixture: ComponentFixture<IconComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [IconComponent],
			providers: [IconService],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(IconComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
