import { Ring } from './ring';
import { Sector } from './sector';

export interface RadarConfig {
	name: string;
	rings: Ring[];
	sectors: Sector[];
	linkColumn: string;
	nameColumn: string;
	sectorColumn: string;
	ringColumn: string;
	contentColumn: string;
	consideredNewInDays: number;
	filterColumnName: string;
	filterColumnEnabled: boolean;
	filterColumnKeywords: string[];
}
