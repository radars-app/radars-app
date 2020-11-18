import { Component, OnInit, Input } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';

import { ContainerFacadeService } from '../../store/sample/container.facade';
import { ButtonType } from '../common-components/components/button/models/button-type.enum';
import { ComponentTheme } from '../../../../shared/component-theme.enum';

const GRAPH_ENDPOINT: string = 'https://graph.microsoft.com/v1.0/me';

@Component({
	selector: 'app-radars-profile-popup',
	templateUrl: './profile-popup.component.html',
	styleUrls: ['./profile-popup.component.scss'],
})
export class ProfilePopupComponent implements OnInit {
	// @Input() public profile;
	public userProfile$: Observable<any> = this.containerFacadeService.selectUserProfile$;

	public appTheme$: Observable<string> = this.containerFacadeService.selectAppTheme$;

	public logoutButtonType: ButtonType = ButtonType.Flat;

	public themeSliderTitle: string = 'Dark mode';

	constructor(private containerFacadeService: ContainerFacadeService) {}

	public ngOnInit(): void {
		// this.getProfile();
	}

	public logout(): void {
		this.containerFacadeService.logout();
	}

	public login(): void {
		this.containerFacadeService.login();
	}

	public toggleTheme(event: boolean): void {
		if (event) {
			this.containerFacadeService.setTheme(ComponentTheme.Dark);
		} else {
			this.containerFacadeService.setTheme(ComponentTheme.Light);
		}
	}
}
