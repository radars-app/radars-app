import { Db } from 'mongodb';
import { Inject, Injectable } from '../ioc';
import { SectorEntity } from '../model/sector-entity';
import { DbAccessService } from './db-access.service';

@Injectable()
export class SectorRepositoryService {
	@Inject() public dbAccessService!: DbAccessService;

	public readonly collection: string = 'sectors';

	public async getSectorsByIds(uids: string[]): Promise<SectorEntity[]> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.find({
				uid: { $in: uids },
			})
			.toArray();
	}

	public async addSector(sector: SectorEntity): Promise<SectorEntity> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.insertOne(sector)
			.then(() => sector);
	}

	public async addSectorsBulk(sectors: SectorEntity[]): Promise<SectorEntity[]> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.insertMany(sectors)
			.then(() => sectors);
	}

	public async updateSector(sector: SectorEntity): Promise<SectorEntity> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.findOneAndReplace(
				{
					uid: { $eq: sector.uid },
				},
				sector
			)
			.then(() => sector);
	}

	public async updateSectorsBulk(sectors: SectorEntity[]): Promise<SectorEntity[]> {
		const updates: Array<Promise<SectorEntity>> = sectors.map((sector: SectorEntity) => this.updateSector(sector));
		return Promise.all([updates]).then(() => sectors);
	}

	public async removeSector(uid: string): Promise<string> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.findOneAndDelete({
				uid: { $eq: uid },
			})
			.then(() => uid);
	}

	public async removeSectorsBulk(ids: string[]): Promise<string[]> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.deleteMany({
				uid: { $in: ids },
			})
			.then(() => ids);
	}
}
