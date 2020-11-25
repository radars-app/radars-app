import { RadarConfig } from './radar-config';

export interface RadarEntity {
	id: string;
	name: string;
	lastUpdatedDate: string;
	radars: any[];
	config: RadarConfig;
}
