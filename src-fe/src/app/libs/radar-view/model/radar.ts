import { RadarConfig } from './radar-config';

export interface Radar {
	id: string;
	name: string;
	lastUpdatedDate: Date;
	rings: string[];
	sectors: string[];
	config: RadarConfig;
}

export interface RadarDto {
	uid: string;
	radarId: string;
	name: string;
	lastUpdatedDate: string;
	versionId: string;
	rings: string[];
	sectors: string[];
	config: RadarConfig;
}
