import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IconService } from '../icon/service/icon.service';
import { TextInputComponent } from './text-input.component';
import { CommonComponentsModule } from '../common-components.module';

describe('TextInputComponent', () => {
	let component: TextInputComponent;
	let fixture: ComponentFixture<TextInputComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [CommonComponentsModule, HttpClientModule, BrowserAnimationsModule],
			declarations: [TextInputComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(TextInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
