import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { AccordionItem } from './models/accordion-item.models';

@Component({
	selector: 'app-radars-accordion',
	templateUrl: './accordion.component.html',
	styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
	@Input() public items: AccordionItem[];
	@Input() public theme: ComponentTheme;

	@Output() public subItemClicked$: EventEmitter<string> = new EventEmitter();

	constructor() {}

	public ngOnInit(): void {}

	public emitSubItemClick(id: string): void {
		this.subItemClicked$.emit(id);
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
}
