import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccordionItem } from './accordion.models';

@Component({
	selector: 'app-radars-accordion',
	templateUrl: './accordion.component.html',
	styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
	@Output() public subitemClicked$: EventEmitter<string> = new EventEmitter();

	public items: AccordionItem[] = [
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
	];

	constructor() {}

	public ngOnInit(): void {}

	public clickSubitem(id: string): void {
		this.subitemClicked$.emit(id);
	}
}
