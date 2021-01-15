import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';
import { IconService } from 'src/app/libs/common-components/icon/service/icon.service';

import { DeleteRadarConfirmationDialogComponent } from './delete-radar-confirmation-dialog.component';

describe('DeleteRadarConfirmationDialogComponent', () => {
	let component: DeleteRadarConfirmationDialogComponent;
	let fixture: ComponentFixture<DeleteRadarConfirmationDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DeleteRadarConfirmationDialogComponent],
			imports: [CommonComponentsModule, HttpClientModule, BrowserAnimationsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(DeleteRadarConfirmationDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
