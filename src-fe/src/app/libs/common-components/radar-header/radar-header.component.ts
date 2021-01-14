import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContainerFacadeService } from '../../container/service/container-facade.service';
import { ButtonModel } from '../button/models/button.model';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { IconButtonModel } from '../icon-button/model/icon-button-model';

@Component({
	selector: 'app-radar-header',
	templateUrl: './radar-header.component.html',
	styleUrls: ['./radar-header.component.scss'],
})
export class RadarHeaderComponent implements OnInit {
	@Input() public title: string;
	@Input() public titlePostfix: string;
	@Input() public buttons: IconButtonModel[];
	@Input() public extraButtons: ButtonModel[];

	public theme$: Observable<ComponentTheme>;

	constructor(private containerFacadeService: ContainerFacadeService) {}

	public ngOnInit(): void {
		this.theme$ = this.containerFacadeService.theme$;
	}
}
