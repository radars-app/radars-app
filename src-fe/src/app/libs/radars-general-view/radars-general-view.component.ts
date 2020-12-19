import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from '../container/service/container-facade.service';

@Component({
	selector: 'app-radars-radars-general-view',
	templateUrl: './radars-general-view.component.html',
	styleUrls: ['./radars-general-view.component.scss'],
})
export class RadarsGeneralViewComponent implements OnInit {
	public theme$: Observable<ComponentTheme>;

	public isDarkTheme$: Observable<boolean>;

	constructor(private containerFacadeService: ContainerFacadeService) {}

	public ngOnInit(): void {
		this.theme$ = this.containerFacadeService.theme$;
		this.isDarkTheme$ = this.containerFacadeService.theme$.pipe(map((theme: ComponentTheme) => theme === ComponentTheme.Dark));
	}
}
