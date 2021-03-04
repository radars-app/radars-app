import { Injectable } from '../ioc';
import { CsvRadarDataItemRecord } from '../model/csv-radar-data-item-record';
import { RadarDataItemEntity } from '../model/radar-data-item-entity';
import { RingEntity } from '../model/ring-entity';
import { SectorEntity } from '../model/sector-entity';
import { uniq } from 'underscore';

@Injectable()
export class CsvRecordsConverterService {
	public toRadarDataItemEntityBulk(
		records: CsvRadarDataItemRecord[],
		rings: RingEntity[],
		sectors: SectorEntity[],
		radarId: string,
		filterEnabled: boolean,
		filterKeywords: string[]
	): RadarDataItemEntity[] {
		let preparedRecords: CsvRadarDataItemRecord[] = this.prepareRecords(records);

		if (filterEnabled) {
			preparedRecords = this.filterRecords(records, filterKeywords);
		}

		const entities: RadarDataItemEntity[] = preparedRecords.map((record: CsvRadarDataItemRecord) => {
			const date: string = new Date().toUTCString();
			return {
				radarId: radarId,
				name: record.name,
				link: record.link,
				content: record.content,
				sectorId: sectors.find((sector: SectorEntity) => sector.keywords.includes(record.sector))?.uid as string,
				ringId: rings.find((ring: RingEntity) => ring.keywords.includes(record.ring))?.uid as string,
				updatedAt: date,
			};
		});

		const validEntities: RadarDataItemEntity[] = this.getValidEntities(entities);

		return validEntities;
	}

	public getValidEntities(entities: RadarDataItemEntity[]): RadarDataItemEntity[] {
		return entities.filter((item: RadarDataItemEntity) => {
			const isSectorDefined: boolean = Boolean(item.sectorId);
			const isRingDefined: boolean = Boolean(item.ringId);

			return isSectorDefined && isRingDefined;
		});
	}

	public prepareRecords(records: CsvRadarDataItemRecord[]): CsvRadarDataItemRecord[] {
		const withoutEmptyRecords: CsvRadarDataItemRecord[] = records.filter((record: CsvRadarDataItemRecord) => {
			return Boolean(record) && Boolean(record.content) && Boolean(record.name);
		});

		const withUniqueNames: CsvRadarDataItemRecord[] = uniq(withoutEmptyRecords, (record: CsvRadarDataItemRecord) => {
			return record.name;
		});

		return withUniqueNames;
	}

	public filterRecords(records: CsvRadarDataItemRecord[], keywords: string[]): CsvRadarDataItemRecord[] {
		return records.filter((record: CsvRadarDataItemRecord) => keywords.includes(record.filter));
	}
}
