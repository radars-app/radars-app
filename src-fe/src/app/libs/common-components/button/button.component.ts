import { Component, Input } from '@angular/core';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { ButtonType } from './models/button-type.enum';
@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
	public basicType: ButtonType = ButtonType.Basic;
	public outlinedType: ButtonType = ButtonType.Outlined;
	public flatType: ButtonType = ButtonType.Flat;

	@Input()
	public type: ButtonType = ButtonType.Basic;

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public disabled: boolean = false;

	@Input()
	public disableRipple: boolean = true;

	@Input()
	public disableHover: boolean = true;

	@Input()
	public fullWidth: boolean = false;

	@Input()
	public topLeftRadius: number;

	@Input()
	public topRightRadius: number;

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
}
