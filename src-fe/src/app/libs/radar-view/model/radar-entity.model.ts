import { RadarConfig } from './radar-config.model';

export interface RadarEntity {
	id: string;
	name: string;
	lastUpdatedDate: string;
	config: RadarConfig;
}

export interface RadarEntityDto {
	id: string;
	name: string;
	lastUpdatedDate: string;
	config: RadarConfig;
}
