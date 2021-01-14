import { Component, Input, OnInit } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';

@Component({
	selector: 'app-radar-editor-navigation',
	templateUrl: './radar-editor-navigation.component.html',
	styleUrls: ['./radar-editor-navigation.component.scss'],
})
export class RadarEditorNavigationComponent implements OnInit {
	@Input()
	public theme: ComponentTheme;

	constructor() {}

	public ngOnInit(): void {}
}
