import { AccordionSubItem } from './accordion-subitem.model';

export interface AccordionItem {
	title: string;
	opened: boolean;
	color: string;
	children: AccordionSubItem[];
}
