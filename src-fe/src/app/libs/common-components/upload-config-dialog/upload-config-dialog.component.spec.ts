import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonComponentsModule } from '../common-components.module';
import { IconService } from '../icon/service/icon.service';

import { UploadConfigDialogComponent } from './upload-config-dialog.component';

describe('UploadConfigDialogComponent', () => {
	let component: UploadConfigDialogComponent;
	let fixture: ComponentFixture<UploadConfigDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UploadConfigDialogComponent],
			imports: [CommonComponentsModule, BrowserAnimationsModule, HttpClientModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(UploadConfigDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when submitConfig called without file', () => {
		beforeEach(() => {
			spyOn(component.dropZone.files$, 'getValue').and.returnValue([]);
			spyOn(component.configUploaded, 'next').and.stub();
			component.popover.close = jasmine.createSpy();
			component.submitConfig();
		});

		it('call popover.close', () => {
			expect(component.popover.close).not.toHaveBeenCalled();
		});

		it('emits loaded file', () => {
			expect(component.configUploaded.next).not.toHaveBeenCalled();
		});
	});
});
