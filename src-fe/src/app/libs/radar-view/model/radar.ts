import { RadarDataItem, RadarDataItemDto } from './radar-data-item';
import { Ring, RingDto } from './ring';
import { Sector, SectorDto } from './sector';

export interface Radar {
	uid: string;
	name: string;
	rings: Ring[];
	sectors: Sector[];
	sharepointListUrl?: string;
	lastUpdatedAt: Date;
	nameColumn: string;
	contentColumn: string;
	linkColumn: string;
	csv?: string;
	sectorColumn: string;
	ringColumn: string;
	consideredNewInDays: number;
	filterColumnEnabled: boolean;
	filterColumnName: string;
	filterColumnKeywords: string[];
	items: RadarDataItem[];
}

export interface RadarDto {
	uid: string;
	name: string;
	rings: RingDto[];
	sectors: SectorDto[];
	sharepointListUrl?: string;
	lastUpdatedAt: string;
	nameColumn: string;
	contentColumn: string;
	linkColumn: string;
	csv?: string;
	sectorColumn: string;
	ringColumn: string;
	consideredNewInDays: number;
	filterColumnEnabled: boolean;
	filterColumnName: string;
	filterColumnKeywords: string[];
	items: RadarDataItemDto[];
}
