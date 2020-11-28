import { Injectable } from '../ioc';
import { DefaultCsvSchemeRecord } from 'app/model/default-csv-scheme-record';
import { RadarDataItemEntity } from 'app/model/radar-data-item-entity';
import { v4 } from 'uuid';

@Injectable()
export class RadarDataItemFactoryService {
	public create(radarId: string, versionId: string, name: string, sector: string, ring: string, content: string): RadarDataItemEntity {
		return {
			id: v4(),
			radarId: radarId,
			versionId: versionId,
			name: name,
			sector: sector,
			ring: ring,
			content: content
		};
	}

	public createFromDefaultSchemeRecord(record: DefaultCsvSchemeRecord, radarId: string, versionId: string): RadarDataItemEntity {
		return {
			id: v4(),
			radarId: radarId,
			versionId: versionId,
			name: record.name,
			sector: record.sector,
			ring: record.ring,
			content: record.content
		};
	}
}
