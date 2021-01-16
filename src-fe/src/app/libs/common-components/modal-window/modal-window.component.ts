import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentTheme } from '../common/enum/component-theme.enum';

@Component({
	selector: 'app-modal-window',
	templateUrl: './modal-window.component.html',
	styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent {
	@ViewChild('template') public popoverTemplate: TemplateRef<Element>;

	@Input() public theme: ComponentTheme = ComponentTheme.Light;
	@Input() public width: string = '340px';

	constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<any>) {}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public open(): void {
		if (this.isDarkTheme) {
			this.dialogRef = this.dialog.open(this.popoverTemplate, {
				minWidth: this.width,
				maxWidth: this.width,
				panelClass: 'modal-window--dark-theme',
			});
		} else {
			this.dialogRef = this.dialog.open(this.popoverTemplate, {
				minWidth: this.width,
				maxWidth: this.width,
			});
		}
	}

	public close(): void {
		this.dialogRef.close();
	}
}
