import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PopoverComponent } from 'src/app/libs/common-components/popover/popover.component';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';

@Component({
	selector: 'app-radars-edit-dialog',
	templateUrl: './edit-dialog.component.html',
	styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
	@ViewChild('radarsPopover', { static: true })
	public readonly radarsPopover: PopoverComponent;

	@Input() public theme: ComponentTheme = ComponentTheme.Light;

	constructor() {}

	public ngOnInit(): void {}

	public open(): void {
		this.radarsPopover.open();
	}
}
