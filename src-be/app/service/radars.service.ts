import { DefaultCsvSchemeRecord } from 'app/model/default-csv-scheme-record';
import { RadarConfig } from 'app/model/radar-config';
import { RadarDataItemEntity } from 'app/model/radar-data-item-entity';
import { Inject, Injectable } from '../ioc';
import { RadarEntity } from '../model/radar-entity';
import { CsvParserService } from './csv-parser.service';
import { RadarDataItemFactoryService } from './radar-data-item-factory.serivce';
import { RadarDataItemService } from './radar-data-item.service';
import { RadarFactoryService } from './radar-factory.serivce';
import { v4 } from 'uuid';

const defaultCsv: string = `Linux,OS,Hold,"Content 1 <a href=""mysite.com"">Test, with comma</a>"
Nano-computing,Hardware,Trial,"Content 2 <a href=""mysite.com"">Test</a>"
Magic,Cloud,Trial,"Content 3 <a href=""mysite.com"">Test</a>"
Wizards,Cloud,Acceptance,"Content 3 <a href=""mysite.com"">Test</a>"
Windows X,OS,Acceptance,"Content 3 <a href=""mysite.com"">Test</a>"`;

const defaultConfig: RadarConfig = {
	name: 'Default Radar',
	csv: defaultCsv
};

const radars: RadarEntity[] = [];

@Injectable()
export class RadarsService {
	@Inject() radarFactory!: RadarFactoryService;
	@Inject() dataItemService!: RadarDataItemService;
	@Inject() csvParser!: CsvParserService;
	@Inject() dataItemFactory!: RadarDataItemFactoryService;

	public async getRadarsById(radarId: string): Promise<RadarEntity[]> {
		const radarEntities: RadarEntity[] | undefined = radars.filter((radar: RadarEntity) => radar.radarId === radarId);

		if (radarEntities.length > 0) {
			return Promise.resolve(radarEntities);
		} else {
			await this.createDefaultRadar(radarId);
			return Promise.resolve(radars.filter((radar: RadarEntity) => radar.radarId === radarId));
		}
	}

	public async createRadar(config: RadarConfig, radarId?: string): Promise<RadarEntity> {
		radarId = Boolean(radarId) ? radarId as string : v4();
		const versionId: string = v4();
		const radar: RadarEntity = this.radarFactory.createFromConfigWithId(config, radarId);
		const records: DefaultCsvSchemeRecord[] = this.csvParser.parseDefaultDataScheme(config.csv);
		const radarDataItemsToCreate: RadarDataItemEntity[] = records.map((record: DefaultCsvSchemeRecord) => {
			return this.dataItemFactory.createFromDefaultSchemeRecord(record, radarId as string, versionId);
		});

		// TODO: remove when versioning implemented
		await this.dataItemService.removeDataItemsByRadarId(radarId);

		await this.dataItemService.createRadarDataItems(radarDataItemsToCreate);

		radars.push(radar);

		return Promise.resolve(radar);
	}

	public async createDefaultRadar(id: string): Promise<RadarEntity> {
		return this.createRadar(defaultConfig, id);
	}
}
