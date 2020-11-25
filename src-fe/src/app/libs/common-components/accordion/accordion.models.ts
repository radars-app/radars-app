export interface AccordionSubItem {
	title: string;
	id: string;
}

export interface AccordionItem {
	title: string;
	opened: boolean;
	color: string;
	children: AccordionSubItem[];
}
