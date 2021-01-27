import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-radars-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
	@Input() public userPhotoURL: string;

	public showProfilePopup: boolean;

	public get photoUrl(): string {
		return Boolean(this.userPhotoURL) ? this.userPhotoURL : '../../../../assets/profile.svg';
	}

	constructor() {}

	public toggleProfilePopup(): void {
		this.showProfilePopup = !this.showProfilePopup;
	}

	public closeProfile(): void {
		this.showProfilePopup = false;
	}
}
