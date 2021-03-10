import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import config from '../../app-config.json';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	constructor(titleService: Title) {
		titleService.setTitle(config.appName.prefix + config.appName.main);
	}
}
