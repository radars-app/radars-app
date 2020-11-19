import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IconService } from '../common-components/icon/service/icon.service';
import { ContainerFacadeService } from './service/container-facade.service';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
	public userPhotoURL$: Observable<string> = this.containerFacadeService.userPhotoBase64$;

	public appTheme$: Observable<string> = this.containerFacadeService.theme$;

	constructor(private containerFacadeService: ContainerFacadeService, private iconService: IconService) {}

	public ngOnInit(): void {
		this.iconService.addIcons();
		this.containerFacadeService.logIn();

		this.containerFacadeService.loadUserPhoto();
		this.containerFacadeService.loadUserInfo();
	}
}
