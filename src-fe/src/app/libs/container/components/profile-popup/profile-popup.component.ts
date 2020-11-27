import { Component, ElementRef, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { ButtonType } from 'src/app/libs/common-components/button/models/button-type.enum';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from '../../service/container-facade.service';

@Component({
	selector: 'app-radars-profile-popup',
	templateUrl: './profile-popup.component.html',
	styleUrls: ['./profile-popup.component.scss'],
	host: { '(window:click)': 'clickHandler($event)' },
})
export class ProfilePopupComponent {
	@Output() public clickOutside$: Observable<boolean>;

	public userProfile$: Observable<any> = this.containerFacadeService.userProfile$;
	public appTheme$: Observable<string> = this.containerFacadeService.theme$;
	public logoutButtonType: ButtonType = ButtonType.Flat;
	public themeSliderTitle: string = 'Dark mode';

	private skipFirstValueSubject: Subject<boolean>;

	constructor(private containerFacadeService: ContainerFacadeService, private eRef: ElementRef) {
		this.skipFirstValueSubject = new Subject<boolean>();
		this.clickOutside$ = this.skipFirstValueSubject.pipe(skip(1));
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

	public clickHandler(event: MouseEvent): void {
		if (!this.eRef.nativeElement.contains(event.target)) {
			this.skipFirstValueSubject.next(true);
		}
	}
}
