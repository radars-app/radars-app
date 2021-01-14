import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonComponentsModule } from '../common-components.module';
import { IconService } from '../icon/service/icon.service';

import { DropZoneComponent } from './drop-zone.component';

describe('DropzoneComponent', () => {
	let component: DropZoneComponent;
	let fixture: ComponentFixture<DropZoneComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DropZoneComponent],
			imports: [CommonComponentsModule, BrowserAnimationsModule, HttpClientModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(DropZoneComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
