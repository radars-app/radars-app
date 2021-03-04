import { RadarDataItemStatus } from './radar-data-item-status';
import { Ring, RingDto } from './ring';
import { Sector, SectorDto } from './sector';

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

export interface RadarDataItem {
	radarId: string;
	ring: Ring;
	sector: Sector;
	name: string;
	content: string;
	link: string;
	updatedAt: Date;
	status: RadarDataItemStatus;
	number: number;
}
