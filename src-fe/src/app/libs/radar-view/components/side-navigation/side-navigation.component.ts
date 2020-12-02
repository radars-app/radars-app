import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AccordionItem } from 'src/app/libs/common-components/accordion/models/accordion-item.models';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { ContainerFacadeService } from 'src/app/libs/container/service/container-facade.service';
import { Radar } from '../../model/radar';
import { RadarViewFacadeService } from '../../service/radar-view-facade.service';

@Component({
	selector: 'app-side-navigation',
	templateUrl: './side-navigation.component.html',
	styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent implements OnInit {
	public items: AccordionItem[];
	public theme$: Observable<ComponentTheme>;
	public lastUpdatedDate$: Observable<Date>;

	constructor(public containerFacade: ContainerFacadeService, private radarViewFacade: RadarViewFacadeService) {}

	public ngOnInit(): void {
		this.theme$ = this.containerFacade.theme$;
		this.lastUpdatedDate$ = this.radarViewFacade.radars$.pipe(
			filter((radars: Radar[]) => Boolean(radars)),
			map((radars: Radar[]) => {
				return radars[0].lastUpdatedDate;
			})
		);

		this.initMockAccordeonItems();
	}

	private initMockAccordeonItems(): void {
		this.items = [
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
	}
}
