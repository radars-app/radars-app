import { Db } from 'mongodb';
import { Inject, Injectable } from '../ioc';
import { RingEntity } from '../model/ring-entity';
import { DbAccessService } from './db-access.service';

@Injectable()
export class RingRepositoryService {
	@Inject() public dbAccessService!: DbAccessService;

	public readonly collection: string = 'rings';

	public async getRingsByIds(uids: string[]): Promise<RingEntity[]> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.find({
				uid: { $in: uids },
			})
			.toArray();
	}

	public async addRing(ring: RingEntity): Promise<RingEntity> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.insertOne(ring)
			.then(() => ring);
	}

	public async addRingsBulk(rings: RingEntity[]): Promise<RingEntity[]> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.insertMany(rings)
			.then(() => rings);
	}

	public async updateRing(ring: RingEntity): Promise<RingEntity> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.findOneAndReplace(
				{
					uid: { $eq: ring.uid },
				},
				ring
			)
			.then(() => ring);
	}

	public async updateRingsBulk(rings: RingEntity[]): Promise<RingEntity[]> {
		const updates: Array<Promise<RingEntity>> = rings.map((ring: RingEntity) => this.updateRing(ring));
		return Promise.all([updates]).then(() => rings);
	}

	public async removeRing(uid: string): Promise<string> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.findOneAndDelete({
				uid: { $eq: uid },
			})
			.then(() => uid);
	}

	public async removeRingsBulk(ids: string[]): Promise<string[]> {
		const db: Db = await this.dbAccessService.radarsDb;
		return db
			.collection(this.collection)
			.deleteMany({
				uid: { $in: ids },
			})
			.then(() => ids);
	}
}
