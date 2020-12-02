import { RadarConfig } from './radar-config.model';

export interface RadarEntity {
	id: string;
	name: string;
	lastUpdatedDate: Date;
	config: RadarConfig;
}

export interface RadarEntityDto {
	uid: string;
	radarId: string;
	name: string;
	lastUpdatedDate: string;
	versionId: string;
	config: RadarConfig;
}
