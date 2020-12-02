import { RadarConfig } from './radar-config';

export interface Radar {
	id: string;
	name: string;
	lastUpdatedDate: Date;
	config: RadarConfig;
}

export interface RadarDto {
	uid: string;
	radarId: string;
	name: string;
	lastUpdatedDate: string;
	versionId: string;
	config: RadarConfig;
}
