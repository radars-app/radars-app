import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { RadarConfig } from '../radar-view/model/radar-config';

@Component({
	selector: 'app-radar-editor',
	templateUrl: './radar-editor.component.html',
	styleUrls: ['./radar-editor.component.scss'],
})
export class RadarEditorComponent implements OnInit {
	@Input()
	public config: RadarConfig;

	@Output()
	public configChanged: EventEmitter<RadarConfig> = new EventEmitter<RadarConfig>();

	public theme$: Observable<ComponentTheme>;

	constructor(private containerFacadeService: ContainerFacadeService) {}

	public isDarkTheme(theme: ComponentTheme): boolean {
		return theme === ComponentTheme.Dark;
	}

	public ngOnInit(): void {
		this.theme$ = this.containerFacadeService.theme$;
	}
}
