import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ContainerFacadeService } from './store/sample/container.facade';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
	public userPhotoURL$: Observable<string> = this.containerFacadeService.selectUserPhotoURL$;

	public appTheme$: Observable<string> = this.containerFacadeService.selectAppTheme$;

	constructor(
		private containerFacadeService: ContainerFacadeService,
		) { }

	ngOnInit(): void {
	}

}
