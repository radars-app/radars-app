import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ContainerFacadeService } from '../../container/service/container-facade.service';

@Injectable({
	providedIn: 'root',
})
export class AdminGuardService implements CanActivate {
	constructor(private containerFacadeService: ContainerFacadeService) {}

	public canActivate(): Observable<boolean> {
		return this.containerFacadeService.isAdmin$;
	}
}
