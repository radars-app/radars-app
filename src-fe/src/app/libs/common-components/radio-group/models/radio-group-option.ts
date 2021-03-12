import { TemplateRef } from '@angular/core';

export interface RadioGroupOption {
	title: string;
	value: string | number;
	template?: TemplateRef<any>;
	disabled?: boolean;
}
