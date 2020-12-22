import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ComponentTheme } from '../common/enum/component-theme.enum';

@Component({
	selector: 'app-radars-radar-card',
	templateUrl: './radar-card.component.html',
	styleUrls: ['./radar-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadarCardComponent implements OnInit {
	@Input() public title: string;
	@Input() public subTitle: string;
	@Input() public theme: ComponentTheme;

	constructor() {}

	public ngOnInit(): void {}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
}
