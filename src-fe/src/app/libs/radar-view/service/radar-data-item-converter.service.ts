import { Injectable } from '@angular/core';
import { RadarDataItem, RadarDataItemDto } from '../model/radar-data-item';

@Injectable({
	providedIn: 'root',
})
export class RadarDataItemConverterService {
	constructor() {}

	public fromDto(dto: RadarDataItemDto, number?: number): RadarDataItem {
		return {
			radarId: dto.radarId,
			link: dto.link,
			updatedAt: new Date(dto.updatedAt),
			name: dto.name,
			ring: {
				uid: dto.ring.uid,
				keywords: dto.ring.keywords,
				label: dto.ring.label,
			},
			sector: {
				uid: dto.sector.uid,
				keywords: dto.sector.keywords,
				label: dto.sector.label,
				color: dto.sector.color,
			},
			content: dto.content,
			number: number,
			status: dto.status,
		};
	}

	public toDto(item: RadarDataItem): RadarDataItemDto {
		return {
			radarId: item.radarId,
			link: item.link,
			updatedAt: item.updatedAt.toUTCString(),
			name: item.name,
			ring: item.ring,
			sector: item.sector,
			content: item.content,
			status: item.status,
		};
	}
}
