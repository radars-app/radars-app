import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ContainerFacadeService } from '../../container/service/container-facade.service';

@Injectable({
	providedIn: 'root',
})
export class AdminGuardService implements CanActivate {
	private isAdmin: boolean;

	constructor(private containerFacadeService: ContainerFacadeService) {
		this.containerFacadeService.isAdmin$.subscribe((isAdmin: boolean) => {
			this.isAdmin = isAdmin;
		});
	}

	public canActivate(): boolean {
		return this.isAdmin;
	}
}
