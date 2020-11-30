import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentTheme } from '../common/enum/component-theme.enum';

@Component({
	selector: 'app-radars-popover',
	templateUrl: './popover.component.html',
	styleUrls: ['./popover.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent {
	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@ViewChild('template')
	public popoverTemplate: TemplateRef<PopoverComponent>;

	constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<any>) {}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public open(): void {
		if (this.isDarkTheme) {
			this.dialogRef = this.dialog.open(this.popoverTemplate, {
				minWidth: '340px',
				panelClass: 'popover--dark',
			});
		} else {
			this.dialogRef = this.dialog.open(this.popoverTemplate, {
				minWidth: '340px',
			});
		}
	}

	public close(): void {
		this.dialogRef.close();
	}
}