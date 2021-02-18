import { Component, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ButtonType } from 'src/app/libs/common-components/button/models/button-type.enum';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from '../../service/container-facade.service';

@Component({
	selector: 'app-radars-profile-popup',
	templateUrl: './profile-popup.component.html',
	styleUrls: ['./profile-popup.component.scss'],
})
export class ProfilePopupComponent {
	public userProfile$: Observable<any> = this.containerFacadeService.userProfile$;
	public appTheme$: Observable<string> = this.containerFacadeService.theme$;
	public logoutButtonType: ButtonType = ButtonType.Flat;
	public themeSliderTitle: string = 'Dark mode';
	public opened: boolean;

	private skipClick: boolean;

	constructor(private containerFacadeService: ContainerFacadeService, private elementRef: ElementRef) {
		this.opened = false;
	}

	public clickHandler = (event: MouseEvent): void => {
		if (!this.skipClick) {
			if (!this.elementRef.nativeElement.contains(event.target)) {
				this.opened = false;
			}
		} else {
			this.skipClick = false;
		}
	};

	public toggle(): void {
		this.opened = !this.opened;

		if (this.opened) {
			window.addEventListener('click', this.clickHandler);
			this.skipClick = true;
		} else {
			window.removeEventListener('click', this.clickHandler);
		}
	}

	public logOut(): void {
		this.containerFacadeService.logOut();
	}

	public logIn(): void {
		this.containerFacadeService.logIn();
	}

	public toggleTheme(theme: boolean): void {
		if (theme) {
			this.containerFacadeService.setTheme(ComponentTheme.Dark);
		} else {
			this.containerFacadeService.setTheme(ComponentTheme.Light);
		}
	}
}
