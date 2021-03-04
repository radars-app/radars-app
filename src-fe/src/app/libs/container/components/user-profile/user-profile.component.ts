import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-radars-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
	@Input() public userPhotoURL: string;

	public showProfilePopup: boolean;

	public get photoUrl(): string {
		return Boolean(this.userPhotoURL)
			? (this.sanitizer.bypassSecurityTrustUrl(this.userPhotoURL) as string)
			: '../../../../assets/profile.svg';
	}

	constructor(private sanitizer: DomSanitizer) {}
}
