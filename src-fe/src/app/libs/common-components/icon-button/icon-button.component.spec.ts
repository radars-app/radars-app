import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonComponentsModule } from '../common-components.module';

import { IconButtonComponent } from './icon-button.component';

describe('IconButtonComponent', () => {
	let component: IconButtonComponent;
	let fixture: ComponentFixture<IconButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [IconButtonComponent],
			imports: [CommonComponentsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(IconButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
