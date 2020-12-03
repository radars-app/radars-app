import { Injectable } from '../ioc';
import { RadarConfig } from 'app/model/radar-config';
import { RadarEntity } from 'app/model/radar-entity';
import { v4 } from 'uuid';

@Injectable()
export class RadarFactoryService {
	public createFromConfig(config: RadarConfig): RadarEntity {
		const radarId: string = v4();
		return this.createFromConfigWithId(config, radarId);
	}

	public createFromConfigWithId(config: RadarConfig, radarId: string): RadarEntity {
		return {
			uid: v4(),
			radarId: radarId,
			lastUpdatedDate: new Date().toISOString(),
			name: config.name,
			versionId: v4(),
			rings: config.rings,
			sectors: config.sectors,
			config: config
		};
	}
}
