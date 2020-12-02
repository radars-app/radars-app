import { RadarConfig } from './radar-config';

export interface RadarEntity {
	uid: string;
	radarId: string;
	name: string;
	lastUpdatedDate: string;
	versionId: string;
	rings: string[];
	sectors: string[];
	config: RadarConfig;
}
