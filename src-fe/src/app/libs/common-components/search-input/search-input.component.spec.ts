import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IconService } from '../icon/service/icon.service';
import { SearchInputComponent } from './search-input.component';
import { CommonComponentsModule } from '../common-components.module';

describe('SearchInputComponent', () => {
	let component: SearchInputComponent;
	let fixture: ComponentFixture<SearchInputComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [CommonComponentsModule, HttpClientModule, BrowserAnimationsModule],
			declarations: [SearchInputComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(SearchInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
