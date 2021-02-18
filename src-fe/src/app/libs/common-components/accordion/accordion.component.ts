import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { AccordionItem } from './models/accordion-item.models';
import { AccordionSubItem } from './models/accordion-subitem.model';

@Component({
	selector: 'app-radars-accordion',
	templateUrl: './accordion.component.html',
	styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
	@Input() public items: AccordionItem[];
	@Input() public theme: ComponentTheme;

	@Output() public subItemClicked$: EventEmitter<string> = new EventEmitter();

	constructor(private cdRef: ChangeDetectorRef) {}

	public ngOnInit(): void {}

	public emitSubItemClick(id: string): void {
		this.subItemClicked$.emit(id);
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public openAccordionByItemId(id: string): void {
		const item: AccordionItem = this.items.find((option: AccordionItem) => {
			return option.children.find((child: AccordionSubItem) => child.id === id);
		});

		if (Boolean(item)) {
			item.opened = true;
		}

		this.cdRef.markForCheck();
	}
}
