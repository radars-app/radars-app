import { Injectable } from '../ioc';
import { DefaultCsvSchemeRecord } from 'app/model/default-csv-scheme-record';
const parse: Function = require('csv-parse/lib/sync');

@Injectable()
export class CsvParserService {
	public parseDefaultDataScheme(csv: string): DefaultCsvSchemeRecord[] {
		const records: DefaultCsvSchemeRecord[] = parse(csv, {
			columns: ['name', 'ring', 'sector', 'content'],
			skip_empty_lines: true
		});

		return records;
	}
}
