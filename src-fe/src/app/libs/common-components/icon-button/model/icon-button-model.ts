import { IconSize } from '../../icon/models/icon-size.enum';

export interface IconButtonModel {
	label: string;
	callback: Function;
	icon: string;
	iconSize: IconSize;
	disabled: boolean;
	isLoading?: boolean;
}
