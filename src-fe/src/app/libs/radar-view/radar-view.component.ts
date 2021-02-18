import { OnDestroy, ViewChild, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { ComponentTheme } from '../common-components/common/enum/component-theme.enum';
import { IconButtonModel } from '../common-components/icon-button/model/icon-button-model';
import { IconSize } from '../common-components/icon/models/icon-size.enum';
import { InfoDialogComponent } from '../common-components/info-dialog/info-dialog.component';
import { AutoCompleteOption } from '../common-components/text-input/model/auto-complete-option';
import { ContainerFacadeService } from '../container/service/container-facade.service';
import { DeleteRadarConfirmationDialogComponent } from './components/delete-radar-confirmation-dialog/delete-radar-confirmation-dialog.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { Radar } from './model/radar';
import { RadarDataItem } from './model/radar-data-item';
import { RadarViewFacadeService } from './service/radar-view-facade.service';

@Component({
	selector: 'app-radars-radar-view',
	templateUrl: './radar-view.component.html',
	styleUrls: ['./radar-view.component.scss'],
})
export class RadarViewComponent implements OnInit, OnDestroy {
	@ViewChild('infoDialog', { static: true }) public readonly infoDialog: InfoDialogComponent;
	@ViewChild('sideNavigation', { static: true }) public sideNavigation: SideNavigationComponent;
	@ViewChild('deleteRadarConfirmationDialog', { static: true })
	public readonly deleteRadarConfirmationDialog: DeleteRadarConfirmationDialogComponent;

	public buttons: IconButtonModel[];
	public theme$: Observable<ComponentTheme> = this.containerFacadeService.theme$;
	public radarName$: Observable<string>;
	public radarId: string;
	public autoCompleteOptions: AutoCompleteOption[];
	public searchQuery$: Subject<string>;

	private destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private containerFacadeService: ContainerFacadeService,
		private route: ActivatedRoute,
		public radarViewFacadeService: RadarViewFacadeService,
		private router: Router
	) {}

	public ngOnInit(): void {
		this.initCommandButtons();
		this.route.paramMap
			.pipe(
				switchMap((params: ParamMap) => params.getAll('id')),
				takeUntil(this.destroy$)
			)
			.subscribe((radarId: string) => {
				this.radarId = radarId;
				this.radarViewFacadeService.loadRadars(radarId);
			});

		this.radarName$ = this.radarViewFacadeService.radars$.pipe(
			takeUntil(this.destroy$),
			filter((radars: Radar[]) => Boolean(radars)),
			map((radars: Radar[]) => radars[radars.length - 1].name)
		);

		combineLatest([this.radarViewFacadeService.filteredRadarDataItems$, this.radarViewFacadeService.searchQuery$])
			.pipe(
				takeUntil(this.destroy$),
				filter(([items, query]: [RadarDataItem[], string]) => Boolean(items) && Boolean(query))
			)
			.subscribe(([items, query]: [RadarDataItem[], string]) => {
				this.updateAutoCompleteOptions(items, query);
			});

		this.autoCompleteOptions = [];
		this.searchQuery$ = new Subject<string>();

		const searchDebounceTime: number = 150;
		this.searchQuery$.pipe(takeUntil(this.destroy$), debounceTime(searchDebounceTime)).subscribe((query: string) => {
			this.search(query);
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}

	public onRemoveConfirmed(): void {
		this.radarViewFacadeService.removeRadar(this.radarId);
		this.router.navigateByUrl('/');
	}

	public onAutoCompleteOptionSelected(option: AutoCompleteOption): void {
		const expandDelay: number = 200;
		setTimeout(() => this.openItemInAccordeon(option.value), expandDelay);
	}

	public onDotClicked(event: RadarDataItem[]): void {
		if (event.length === 1) {
			this.openInfoDialog(event[0].id);
		}
	}

	public openInfoDialog(event: string): void {
		this.infoDialog.open(event);
	}

	public search(searchString: string): void {
		this.radarViewFacadeService.searchRadarItems(searchString);
	}

	private openItemInAccordeon(id: string): void {
		this.sideNavigation.openAccordionByItemId(id);
	}

	private updateAutoCompleteOptions(items: RadarDataItem[], query: string): void {
		this.autoCompleteOptions = items.reduce((options: AutoCompleteOption[], item: RadarDataItem) => {
			query = query.toLowerCase();

			const foundInName: boolean = item.name.toLowerCase().includes(query);
			const foundInContent: boolean = item.content.toLowerCase().includes(query);

			if (foundInName || foundInContent) {
				options.push({
					label: item.name,
					value: item.id,
				});
			}

			return options;
		}, []);
	}

	private initCommandButtons(): void {
		this.containerFacadeService.isAdmin$.pipe(takeUntil(this.destroy$)).subscribe((isAdmin: boolean) => {
			const printButton: IconButtonModel = {
				label: 'Print Radar',
				callback: () => {},
				icon: 'print',
				iconSize: IconSize.Medium,
				disabled: true,
			};

			const editButton: IconButtonModel = {
				label: 'Edit',
				callback: () => {
					this.router.navigateByUrl(`/radars/${this.radarId}/edit`);
				},
				icon: 'edit_1',
				iconSize: IconSize.Medium,
				disabled: false,
			};

			const removeButton: IconButtonModel = {
				label: 'Remove',
				callback: () => {
					this.deleteRadarConfirmationDialog.open();
				},
				icon: 'delete',
				iconSize: IconSize.Medium,
				disabled: false,
			};

			const buttons: IconButtonModel[] = [];
			buttons.push(printButton);

			if (isAdmin) {
				buttons.push(editButton);
				buttons.push(removeButton);
			}

			this.buttons = buttons;
		});
	}
}
