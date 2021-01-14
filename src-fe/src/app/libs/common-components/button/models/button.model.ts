import { ButtonType } from './button-type.enum';

export interface ButtonModel {
	label: string;
	callback: Function;
	disabled: boolean;
	type?: ButtonType;
}
