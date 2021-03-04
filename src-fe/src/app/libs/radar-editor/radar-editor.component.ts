import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { Radar } from '../radar-view/model/radar';

@Component({
	selector: 'app-radar-editor',
	templateUrl: './radar-editor.component.html',
	styleUrls: ['./radar-editor.component.scss'],
})
export class RadarEditorComponent implements OnInit {
	@Input()
	public radar: Radar;

	@Output()
	public radarChanged: EventEmitter<Radar> = new EventEmitter<Radar>();

	public theme$: Observable<ComponentTheme>;

	constructor(private containerFacadeService: ContainerFacadeService) {}

	public isDarkTheme(theme: ComponentTheme): boolean {
		return theme === ComponentTheme.Dark;
	}

	public ngOnInit(): void {
		this.theme$ = this.containerFacadeService.theme$;
	}
}
