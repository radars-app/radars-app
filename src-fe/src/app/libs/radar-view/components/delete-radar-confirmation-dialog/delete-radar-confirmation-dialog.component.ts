import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ModalWindowComponent } from 'src/app/libs/common-components/modal-window/modal-window.component';

@Component({
	selector: 'app-delete-radar-confirmation-dialog',
	templateUrl: './delete-radar-confirmation-dialog.component.html',
	styleUrls: ['./delete-radar-confirmation-dialog.component.scss'],
})
export class DeleteRadarConfirmationDialogComponent {
	@ViewChild('modal', { static: true })
	public readonly modal: ModalWindowComponent;

	@Input() public theme: ComponentTheme;
	@Input() public radarName: string;

	@Output() public removeConfirmed: EventEmitter<void>;

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	constructor() {
		this.removeConfirmed = new EventEmitter<void>();
	}

	public open(): void {
		this.modal.open();
	}

	public close(): void {
		this.modal.close();
	}

	public onRemoveConfirmed(): void {
		this.removeConfirmed.next();
		this.close();
	}
}
