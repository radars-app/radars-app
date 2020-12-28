import { Component, Input, OnInit } from '@angular/core';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { DropDownItem } from '../common/models/drop-down-item';

@Component({
	selector: 'app-drop-down',
	templateUrl: './drop-down.component.html',
	styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent implements OnInit {
	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public items: DropDownItem[] = [];

	constructor() {}

	public ngOnInit(): void {}
}
