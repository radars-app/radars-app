import { RadarDataItemStatus } from './radar-data-item-status';
import { RingDto } from './ring-entity';
import { SectorDto } from './sector-entity';

export interface RadarDataItemEntity {
	radarId: string;
	ringId: string;
	sectorId: string;
	name: string;
	content: string;
	link: string;
	updatedAt: string;
}

export interface RadarDataItemEntityWithStatus extends RadarDataItemEntity {
	status: RadarDataItemStatus;
}

export interface RadarDataItemDto {
	radarId: string;
	ring: RingDto;
	sector: SectorDto;
	name: string;
	content: string;
	link: string;
	updatedAt: string;
	status: RadarDataItemStatus;
}
