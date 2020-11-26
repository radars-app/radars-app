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
	@ViewChild('editRadarDialog', { static: true })
	public readonly editRadarDialog: EditDialogComponent;

	public buttons: IconButtonModel[];

	public darkTheme$: Observable<boolean> = this.containerFacadeService.theme$.pipe(
		map((theme: ComponentTheme) => theme === ComponentTheme.Dark)
	);

	public theme$: Observable<ComponentTheme> = this.containerFacadeService.theme$;

	public items$: Observable<AccordionItem[]> = of([
		{
			title: 'Techniques',
			opened: false,
			color: '#123123',
			children: [
				{
					title: 'Sequrity policy as code',
					id: 'SPAC1',
				},
			],
		},
		{
			title: 'Platforms',
			opened: false,
			color: 'green',
			children: [
				{
					title: 'Sequrity policy as code',
					id: 'SPAC2',
				},
			],
		},
		{
			title: 'Tools',
			opened: false,
			color: 'purple',
			children: [
				{
					title: 'Sequrity policy as code',
					id: 'SPAC3',
				},
			],
		},
		{
			title: 'Languages-And-Framworks',
			opened: false,
			color: 'yellow',
			children: [
				{
					title: 'Sequrity policy as code',
					id: 'SPAC4',
				},
			],
		},
		{
			title: 'Devices',
			opened: false,
			color: 'orange',
			children: [
				{
					title: 'Sequrity policy as code',
					id: 'SPAC5',
				},
			],
		},
		{
			title: 'Technologies',
			opened: false,
			color: 'blue',
			children: [
				{
					title: 'Sequrity policy as code',
					id: 'SPAC6',
				},
			],
		},
		{
			title: 'Startups',
			opened: false,
			color: 'violet',
			children: [
				{
					title: 'Sequrity policy as code',
					id: 'SPAC71',
				},
				{
					title: 'Sequrity policy as code',
					id: 'SPAC72',
				},
				{
					title: 'Sequrity policy as code',
					id: 'SPAC73',
				},
				{
					title: 'Sequrity policy as code',
					id: 'SPAC74',
				},
				{
					title: 'Sequrity policy as code',
					id: 'SPAC7',
				},
				{
					title: 'Sequrity policy as code',
					id: 'SPAC7',
				},
			],
		},
	]);

	constructor(private containerFacadeService: ContainerFacadeService) {}

	public ngOnInit(): void {
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
