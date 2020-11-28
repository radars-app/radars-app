import { Injectable } from '../ioc';
import { RadarDataItemEntity } from 'app/model/radar-data-item-entity';

let radarDataItems: RadarDataItemEntity[] = [];

@Injectable()
export class RadarDataItemService {
	public async getDataItemsSetByRadarId(radarId: string): Promise<RadarDataItemEntity[]> {
		const items: RadarDataItemEntity[] = radarDataItems.filter((item: RadarDataItemEntity) => item.radarId === radarId);
		return Promise.resolve(items);
	}

	public async createRadarDataItems(items: RadarDataItemEntity[]): Promise<RadarDataItemEntity[]> {
		radarDataItems.push(...items);
		return Promise.resolve(items);
	}

	public async removeDataItemsByRadarId(radarId: string): Promise<void> {
		radarDataItems = radarDataItems.filter((item: RadarDataItemEntity) => item.radarId !== radarId);
		return Promise.resolve();
	}
}
