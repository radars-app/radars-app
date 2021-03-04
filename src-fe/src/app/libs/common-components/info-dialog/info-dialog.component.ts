import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Radar } from '../../radar-view/model/radar';
import { RadarDataItem } from '../../radar-view/model/radar-data-item';
import { Ring } from '../../radar-view/model/ring';
import { Sector } from '../../radar-view/model/sector';
import { RadarViewFacadeService } from '../../radar-view/service/radar-view-facade.service';
import { ComponentTheme } from '../common/enum/component-theme.enum';
import { ModalWindowComponent } from '../modal-window/modal-window.component';

@Component({
	selector: 'app-radars-info-dialog',
	templateUrl: './info-dialog.component.html',
	styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent implements OnInit, OnDestroy {
	@ViewChild('modal', { static: true })
	public readonly modal: ModalWindowComponent;

	@Input() public theme: ComponentTheme = ComponentTheme.Light;

	public isClusterItemOpened: boolean = false;

	public selectedItems: RadarDataItem[] = [];
	public selectedItemIds: Subject<string[]> = new Subject<string[]>();
	public selectedContent: SafeHtml;

	public get isSingleDotToShow(): boolean {
		return this.isSingleDot || this.isClusterItemOpened;
	}

	public get isSingleDot(): boolean {
		return this.selectedItems.length === 1;
	}

	public get singleDot(): RadarDataItem {
		return this.selectedItems[0];
	}

	public title: BehaviorSubject<string> = new BehaviorSubject<string>('');

	public get sector(): Sector {
		return this.selectedItems[0]?.sector;
	}

	public get ring(): Ring {
		return this.selectedItems[0]?.ring;
	}

	public destroy$: Subject<void> = new Subject<void>();

	constructor(private radarViewFacadeService: RadarViewFacadeService, private sanitizer: DomSanitizer) {}

	public ngOnInit(): void {
		combineLatest([this.radarViewFacadeService.radar$, this.selectedItemIds])
			.pipe(takeUntil(this.destroy$))
			.subscribe(([radar, ids]: [Radar, string[]]) => {
				this.selectedItems = this.getItemsByIds(radar.items, ids);
				if (this.isSingleDot) {
					this.selectedContent = this.sanitizer.bypassSecurityTrustHtml(this.selectedItems[0].content);
					this.title.next(`${this.selectedItems[0].number}. ${this.selectedItems[0].name}`);
				} else {
					this.title.next(`Cluster ${this.selectedItems.length} items`);
				}
			});
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public open(itemIds: string[]): void {
		this.isClusterItemOpened = false;
		this.selectedItemIds.next(itemIds);
		this.modal.open();
	}

	public close(): void {
		this.modal.close();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public showClusterItem(item: RadarDataItem): void {
		this.isClusterItemOpened = true;
		this.selectedContent = this.sanitizer.bypassSecurityTrustHtml(item.content);
		this.title.next(`${item.number}. ${item.name}`);
	}

	public hideClusterItem(): void {
		this.isClusterItemOpened = false;
	}

	private getItemsByIds(allItems: RadarDataItem[], ids: string[]): RadarDataItem[] {
		return allItems.filter((item: RadarDataItem) => {
			return ids.some((id: string) => {
				return item.name === id;
			});
		});
	}
}
