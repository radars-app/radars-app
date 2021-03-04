import { Inject, Injectable } from '../ioc';
import { DbAccessService } from './db-access.service';
import { RadarDataItemEntity } from '../model/radar-data-item-entity';
import { Db } from 'mongodb';

@Injectable()
export class RadarDataItemRepositoryService {
	@Inject() public dbAccessService!: DbAccessService;

	public readonly collection: string = 'radar-data-items';

	public async getRadarDataItemsByRadarId(radarId: string): Promise<RadarDataItemEntity[]> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.find({
				radarId: { $eq: radarId },
			})
			.toArray();
	}

	public async getRadarDataItemsByRadarsId(radarsId: string[]): Promise<RadarDataItemEntity[]> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.find({
				radarId: { $in: radarsId },
			})
			.toArray();
	}

	public async addRadarDataItems(items: RadarDataItemEntity[]): Promise<RadarDataItemEntity[]> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.insertMany(items)
			.then(() => items);
	}

	public async removeRadarDataItemsByRadarId(radarId: string): Promise<string> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.deleteMany({
				radarId: { $eq: radarId },
			})
			.then(() => radarId);
	}
}
