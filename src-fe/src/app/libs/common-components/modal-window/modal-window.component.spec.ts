import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconService } from '../icon/service/icon.service';

import { CommonComponentsModule } from '../common-components.module';
import { ModalWindowComponent } from './modal-window.component';

describe('ModalWidowComponent', () => {
	let component: ModalWindowComponent;
	let fixture: ComponentFixture<ModalWindowComponent>;
	const timer: number = 1000;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ModalWindowComponent],
			imports: [MatDialogModule, BrowserAnimationsModule, HttpClientModule, CommonComponentsModule],
			providers: [
				{
					provide: MatDialogRef,
					useValue: {},
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		const iconService: IconService = TestBed.inject(IconService);
		iconService.addIcons();
		fixture = TestBed.createComponent(ModalWindowComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('modal window', () => {
		it('open method should open modal', () => {
			component.open();
			expect(document.body.innerHTML.includes('mat-dialog-container')).toBeTruthy();
			fixture.detectChanges();
			component.close();
		});
		it('close method should close modal', async () => {
			await new Promise((resolve: any) => {
				component.open();
				fixture.detectChanges();
				component.close();
				setTimeout(() => {
					expect(document.body.innerHTML.includes('mat-dialog-container')).toBeFalsy();
					resolve();
				}, timer);
			});
		});
	});
});
