import { Injectable } from '@angular/core';
import { Radar, RadarDto } from '../model/radar';
import { RadarDataItem, RadarDataItemDto } from '../model/radar-data-item';
import { Ring, RingDto } from '../model/ring';
import { Sector, SectorDto } from '../model/sector';
import { RadarDataItemConverterService } from './radar-data-item-converter.service';

@Injectable({
	providedIn: 'root',
})
export class RadarConverterService {
	constructor(private radarDataItemConverter: RadarDataItemConverterService) {}

	public fromDto(dto: RadarDto): Radar {
		const radar: Radar = {
			uid: dto.uid,
			name: dto.name,
			lastUpdatedAt: new Date(dto.lastUpdatedAt),
			rings: dto.rings.map((ringDto: RingDto) => {
				return {
					uid: ringDto.uid,
					label: ringDto.label,
					keywords: ringDto.keywords,
				};
			}),
			sectors: dto.sectors.map((sectorDto: SectorDto) => {
				return {
					uid: sectorDto.uid,
					label: sectorDto.label,
					keywords: sectorDto.keywords,
					color: sectorDto.color,
				};
			}),
			nameColumn: dto.nameColumn,
			contentColumn: dto.contentColumn,
			linkColumn: dto.linkColumn,
			sectorColumn: dto.sectorColumn,
			ringColumn: dto.ringColumn,
			csv: dto.csv,
			consideredNewInDays: dto.consideredNewInDays,
			filterColumnEnabled: dto.filterColumnEnabled,
			filterColumnName: dto.filterColumnName,
			filterColumnKeywords: dto.filterColumnKeywords,
			items: dto.items.map((itemDto: RadarDataItemDto) => this.radarDataItemConverter.fromDto(itemDto)),
		};

		let number: number = 0;
		radar.sectors.forEach((sector: Sector) => {
			radar.rings.forEach((ring: Ring) => {
				const findedRadarItems: RadarDataItem[] = radar.items.filter(
					(item: RadarDataItem) => item.ring.uid === ring.uid && item.sector.uid === sector.uid
				);
				findedRadarItems.forEach((item: RadarDataItem) => {
					item.number = ++number;
				});
			});
		});

		return radar;
	}

	public toDto(radar: Radar): RadarDto {
		return {
			uid: radar.uid,
			name: radar.name,
			lastUpdatedAt: radar.lastUpdatedAt.toUTCString(),
			rings: radar.rings,
			sectors: radar.sectors,
			nameColumn: radar.nameColumn,
			contentColumn: radar.contentColumn,
			linkColumn: radar.linkColumn,
			sectorColumn: radar.sectorColumn,
			ringColumn: radar.ringColumn,
			csv: radar.csv,
			consideredNewInDays: radar.consideredNewInDays,
			filterColumnEnabled: radar.filterColumnEnabled,
			filterColumnName: radar.filterColumnName,
			filterColumnKeywords: radar.filterColumnKeywords,
			items: [],
		};
	}
}
