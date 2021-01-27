import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import appConfig from '../../../../../../app-config.json';
import { ComponentTheme } from '../../../common-components/common/enum/component-theme.enum';

@Component({
	selector: 'app-radars-global-header',
	templateUrl: './global-header.component.html',
	styleUrls: ['./global-header.component.scss'],
})
export class GlobalHeaderComponent implements OnInit {
	@Input() public userPhotoURL: string;
	@Input() public isAdmin: boolean;

	public appNamePrefix: string = appConfig.appName.prefix;
	public appNameMain: string = appConfig.appName.main;
	public createRadarButtonTheme: ComponentTheme = ComponentTheme.Dark;

	public get isRootPageOpened(): boolean {
		return this.router.url === '/';
	}

	constructor(private router: Router) {}

	public ngOnInit(): void {}
}
