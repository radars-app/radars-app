import { Component, Input } from '@angular/core';
import { ComponentTheme } from '../common/enum/component-theme.enum';

@Component({
	selector: 'app-editor-panel',
	templateUrl: './editor-panel.component.html',
	styleUrls: ['./editor-panel.component.scss'],
})
export class EditorPanelComponent {
	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public title: string;

	constructor() {}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
}
