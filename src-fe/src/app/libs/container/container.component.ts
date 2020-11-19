import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContainerFacadeService } from './service/container-facade.service';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
	public userPhotoURL$: Observable<string> = this.containerFacadeService.userPhotoBase64$;

	public appTheme$: Observable<string> = this.containerFacadeService.theme$;

	constructor(private containerFacadeService: ContainerFacadeService) {}

	public ngOnInit(): void {
		this.containerFacadeService.logIn();

		this.containerFacadeService.loadUserPhoto();
		this.containerFacadeService.loadUserInfo();
	}
}
