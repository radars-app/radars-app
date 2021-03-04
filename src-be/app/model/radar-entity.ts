import { RadarDataItemDto } from './radar-data-item-entity';
import { RingDto } from './ring-entity';
import { SectorDto } from './sector-entity';

export interface RadarEntity {
	uid: string;
	name: string;
	ringIds: string[];
	sectorIds: string[];
	sharepointListUrl?: string;
	lastUpdatedAt: string;
	nameColumn: string;
	contentColumn: string;
	linkColumn: string;
	sectorColumn: string;
	ringColumn: string;
	consideredNewInDays: number;
	filterColumnEnabled: boolean;
	filterColumnName: string;
	filterColumnKeywords: string[];
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
