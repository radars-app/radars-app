import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccordionItem } from '../common-components/accordion/models/accordion-item.models';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { IconButtonModel } from '../common-components/icon-button/model/icon-button-model';
import { IconSize } from '../common-components/icon/models/icon-size.enum';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';

@Component({
	selector: 'app-radars-radar-view',
	templateUrl: './radar-view.component.html',
	styleUrls: ['./radar-view.component.scss'],
})
export class RadarViewComponent implements OnInit {
	@ViewChild('editRadarDialog', { static: true }) public readonly editRadarDialog: EditDialogComponent;

	public buttons: IconButtonModel[];

	public theme$: Observable<ComponentTheme> = this.containerFacadeService.theme$;

	constructor(private containerFacadeService: ContainerFacadeService) {}

	public ngOnInit(): void {
		this.initCommandButtons();
	}

	private initCommandButtons(): void {
		const printButton: IconButtonModel = {
			label: 'Print Radar',
			callback: () => {},
			icon: 'print',
			iconSize: IconSize.S,
		};

		const editButton: IconButtonModel = {
			label: 'Edit',
			callback: () => {
				this.editRadarDialog.open();
			},
			icon: 'edit_1',
			iconSize: IconSize.S,
		};

		const removeButton: IconButtonModel = {
			label: 'Remove',
			callback: () => {},
			icon: 'delete',
			iconSize: IconSize.S,
		};

		this.buttons = [printButton, editButton, removeButton];
	}
}
