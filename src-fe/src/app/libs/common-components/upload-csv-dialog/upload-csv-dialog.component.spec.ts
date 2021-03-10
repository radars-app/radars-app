import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonComponentsModule } from '../common-components.module';
import { IconService } from '../icon/service/icon.service';

import { UploadCsvDialogComponent } from './upload-csv-dialog.component';

describe('UploadCsvDialogComponent', () => {
	let component: UploadCsvDialogComponent;
	let fixture: ComponentFixture<UploadCsvDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UploadCsvDialogComponent],
			imports: [CommonComponentsModule, BrowserAnimationsModule, HttpClientModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(UploadCsvDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
