import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IconService } from '../icon/service/icon.service';

import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
	let component: SearchInputComponent;
	let fixture: ComponentFixture<SearchInputComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
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
