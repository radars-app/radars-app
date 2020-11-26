import { Injectable } from '../ioc';
import { RadarEntity } from '../model/radar-entity';

let radarMock: RadarEntity = {
	id: 'id',
	name: 'Default Radar',
	lastUpdatedDate: new Date().toUTCString(),
	radars: [],
	config: {
		name: 'Default Radar',
		csv: `
Trial,Linux,OS,"Content 1 <a href=""mysite.com"">Test, with comma</a>"
Not Necessary Ring,Windows,OS,"Content 2 <a href=""mysite.com"">Test</a>"
Necessary Ring,Nano-computing,Cloud,"Content 3 <a href=""mysite.com"">Test</a>"`,
	}
};

@Injectable()
export class RadarsService {
	public async getRadarById(_: string): Promise<RadarEntity> {
		return Promise.resolve(radarMock);
	}

	public async updateRadarById(_: string, radar: RadarEntity): Promise<RadarEntity> {
		radarMock = radar;
		radarMock.lastUpdatedDate = new Date().toUTCString();
		radarMock.name = radar.config.name;
		return Promise.resolve(radarMock);
	}
}
