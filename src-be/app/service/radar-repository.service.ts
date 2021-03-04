import { Db } from 'mongodb';
import { Inject, Injectable } from '../ioc';
import { RadarEntity } from '../model/radar-entity';
import { DbAccessService } from './db-access.service';

@Injectable()
export class RadarRepositoryService {
	@Inject() public dbAccessService!: DbAccessService;

	public readonly collection: string = 'radars';

	public async getRadarById(uid: string): Promise<RadarEntity> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db.collection(this.collection).findOne({
			uid: { $eq: uid },
		});
	}

	public async getAllRadars(): Promise<RadarEntity[]> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db.collection(this.collection).find({}).toArray();
	}

	public async createRadar(radar: RadarEntity): Promise<RadarEntity> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.insertOne(radar)
			.then(() => radar);
	}

	public async removeRadar(uid: string): Promise<string> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.findOneAndDelete({
				uid: { $eq: uid },
			})
			.then(() => uid);
	}

	public async updateRadar(radar: RadarEntity): Promise<RadarEntity> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.findOneAndReplace(
				{
					uid: { $eq: radar.uid },
				},
				radar
			)
			.then(() => radar);
	}
}
