import { CsvRadarDataItemRecord } from '../model/csv-radar-data-item-record';
import { RadarDto } from '../model/radar-entity';
import { Injectable } from '../ioc';
const parse: Function = require('csv-parse/lib/sync');

@Injectable()
export class CsvParserService {
	public parseDefaultDataScheme(csv: string): CsvRadarDataItemRecord[] {
		const records: CsvRadarDataItemRecord[] = parse(csv, {
			columns: ['name', 'sector', 'ring', 'content'],
			skip_empty_lines: true,
		});

		return records;
	}

	public parseCustomDataScheme(csv: string, radarDto: RadarDto): CsvRadarDataItemRecord[] {
		const records: any[] = parse(csv, {
			columns: true,
			skip_empty_lines: true,
		});

		return records.map((item: any) => {
			return {
				name: item[radarDto.nameColumn],
				content: item[radarDto.contentColumn],
				link: item[radarDto.linkColumn],
				sector: item[radarDto.sectorColumn],
				ring: item[radarDto.ringColumn],
				filter: item[radarDto.filterColumnName],
			};
		});
	}
}
