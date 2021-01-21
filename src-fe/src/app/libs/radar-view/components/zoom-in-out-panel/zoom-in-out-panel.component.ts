import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';

@Component({
	selector: 'app-zoom-in-out-panel',
	templateUrl: './zoom-in-out-panel.component.html',
	styleUrls: ['./zoom-in-out-panel.component.scss'],
})
export class ZoomInOutPanelComponent implements OnInit {
	@Output() public zoomInClicked: EventEmitter<void>;
	@Output() public zoomOutClicked: EventEmitter<void>;
	@Output() public zoomResetClicked: EventEmitter<void>;
	public theme$: Observable<ComponentTheme>;

	constructor(private containerFacade: ContainerFacadeService) {
		this.zoomInClicked = new EventEmitter<void>();
		this.zoomOutClicked = new EventEmitter<void>();
		this.zoomResetClicked = new EventEmitter<void>();
	}

	public ngOnInit(): void {
		this.theme$ = this.containerFacade.theme$;
	}

	public zoomIn(): void {
		this.zoomInClicked.next();
	}

	public zoomOut(): void {
		this.zoomOutClicked.next();
	}

	public zoomReset(): void {
		this.zoomResetClicked.next();
	}
}
