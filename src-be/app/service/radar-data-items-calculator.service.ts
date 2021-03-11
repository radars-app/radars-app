import { Injectable } from '../ioc';
import { RadarDataItemEntity, RadarDataItemEntityWithStatus } from '../model/radar-data-item-entity';
import { RadarDataItemStatus } from '../model/radar-data-item-status';

@Injectable()
export class RadarDataItemCalculatorService {
	public calculateStatusForItems(
		items: RadarDataItemEntity[],
		consideredNewInDays: number,
		selectedDate: Date
	): RadarDataItemEntityWithStatus[] {
		const map: Map<string, RadarDataItemEntity[]> = this.sortMapItemsByUpdatedAt(this.mapItemsByName(items));
		const latestItems: RadarDataItemEntity[] = this.filterRemovedItems(this.getLatestItems(map, selectedDate));

		const consideredNewDate: Date = new Date(selectedDate);
		const millisecondsInDay: number = 86400000;
		consideredNewDate.setTime(selectedDate.getTime() - millisecondsInDay * consideredNewInDays);

		const itemsWithStatusList: RadarDataItemEntityWithStatus[] = latestItems.map((latestItem: RadarDataItemEntity) => {
			const history: RadarDataItemEntity[] = this.prepareHistory(
				latestItem,
				map.get(latestItem.name) as RadarDataItemEntity[],
				consideredNewDate,
				selectedDate
			);

			const changedFields: Set<string> = new Set<string>();
			history.forEach((item: RadarDataItemEntity) => {
				if (latestItem.content !== item.content) {
					changedFields.add('content');
				}

				if (latestItem.link !== item.link) {
					changedFields.add('link');
				}

				if (latestItem.ringId !== item.ringId) {
					changedFields.add('ringId');
				}

				if (latestItem.sectorId !== item.sectorId) {
					changedFields.add('sector');
				}
			});

			const itemFullHistory: RadarDataItemEntity[] = map.get(latestItem.name) as RadarDataItemEntity[];
			const hasHistory: boolean = itemFullHistory.length > 1;
			const condideredNewDateInMilliseconds: number = consideredNewDate.getTime();
			const isFreshAdded: boolean = hasHistory && condideredNewDateInMilliseconds < new Date(itemFullHistory[0].updatedAt).getTime();

			const isNoChanges: boolean = changedFields.size === 0;
			const isUpdated: boolean = changedFields.has('link') || changedFields.has('content') || history.length === 0 || isFreshAdded;
			const isMoved: boolean = changedFields.has('ringId') || changedFields.has('sectorId');
			let itemStatus: RadarDataItemStatus = RadarDataItemStatus.NoChanges;

			if (isNoChanges) {
				itemStatus = RadarDataItemStatus.NoChanges;
			}

			if (isUpdated) {
				itemStatus = RadarDataItemStatus.Updated;
			}

			if (isMoved) {
				itemStatus = RadarDataItemStatus.Moved;
			}

			return {
				...latestItem,
				status: itemStatus,
			};
		});

		return itemsWithStatusList;
	}

	public getLatestRadarItemsByRadarsId(radarsId: string[], items: RadarDataItemEntity[], selectedDate: Date): RadarDataItemEntity[] {
		return radarsId.reduce((latestItems: RadarDataItemEntity[], radarId: string) => {
			const radarItems: RadarDataItemEntity[] = items.filter((item: RadarDataItemEntity) => item.radarId === radarId);
			const map: Map<string, RadarDataItemEntity[]> = this.sortMapItemsByUpdatedAt(this.mapItemsByName(radarItems));
			const latestRadarItems: RadarDataItemEntity[] = this.filterRemovedItems(this.getLatestItems(map, selectedDate));
			return [...latestItems, ...latestRadarItems];
		}, []);
	}

	private mapItemsByName(items: RadarDataItemEntity[]): Map<string, RadarDataItemEntity[]> {
		const map: Map<string, RadarDataItemEntity[]> = new Map<string, RadarDataItemEntity[]>();
		items.forEach((item: RadarDataItemEntity) => {
			const mapItems: RadarDataItemEntity[] = map.get(item.name) as RadarDataItemEntity[];
			const isDefined: boolean = Boolean(mapItems);

			if (!isDefined) {
				map.set(item.name, [item]);
			} else {
				const newItems: RadarDataItemEntity[] = [...mapItems, item];
				map.set(item.name, newItems);
			}
		});
		return map;
	}

	private sortMapItemsByUpdatedAt(map: Map<string, RadarDataItemEntity[]>): Map<string, RadarDataItemEntity[]> {
		map.forEach((items: RadarDataItemEntity[], name: string) => {
			const sortedItems: RadarDataItemEntity[] = items.sort((a: RadarDataItemEntity, b: RadarDataItemEntity) => {
				const dateA: number = new Date(a.updatedAt).getTime();
				const dateB: number = new Date(b.updatedAt).getTime();
				return dateA - dateB;
			});

			map.set(name, sortedItems);
		});
		return map;
	}

	private prepareHistory(
		latestItem: RadarDataItemEntity,
		history: RadarDataItemEntity[],
		consideredNewDate: Date,
		selectedDate: Date
	): RadarDataItemEntity[] {
		let cleanHistory: RadarDataItemEntity[] = history.filter((historyItem: RadarDataItemEntity) => {
			const itemNotExists: boolean = new Date(historyItem.updatedAt).getTime() >= selectedDate.getTime();
			const itenIsOld: boolean = new Date(historyItem.updatedAt).getTime() <= consideredNewDate.getTime();
			const isLatestItem: boolean = historyItem.updatedAt === latestItem.updatedAt;
			return !(itemNotExists || itenIsOld || isLatestItem);
		});

		const latestRemovedItem: RadarDataItemEntity = cleanHistory.reduce(
			(removedItem: RadarDataItemEntity, item: RadarDataItemEntity) => {
				const isRemoved: boolean = !Boolean(item.content);
				return isRemoved ? item : removedItem;
			},
			undefined as any
		);

		if (Boolean(latestRemovedItem)) {
			cleanHistory = cleanHistory.filter((item: RadarDataItemEntity) => {
				return new Date(item.updatedAt).getTime() > new Date(latestRemovedItem.updatedAt).getTime();
			});
		}

		return cleanHistory;
	}

	private getLatestItems(map: Map<string, RadarDataItemEntity[]>, selectedDate: Date): RadarDataItemEntity[] {
		const latestItems: RadarDataItemEntity[] = [];
		map.forEach((mappedItems: RadarDataItemEntity[], _: string) => {
			const items: RadarDataItemEntity[] = mappedItems.filter((item: RadarDataItemEntity) => {
				return new Date(item.updatedAt).getTime() <= selectedDate.getTime();
			});
			latestItems.push(items[items.length - 1]);
		});

		return latestItems;
	}

	private filterRemovedItems(items: RadarDataItemEntity[]): RadarDataItemEntity[] {
		return items.filter((item: RadarDataItemEntity) => {
			return Boolean(item) && Boolean(item.content);
		});
	}
}
