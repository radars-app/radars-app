import { Injectable } from '@angular/core';
import { RadarDataItem, RadarDataItemDto } from '../model/radar-data-item';

@Injectable({
	providedIn: 'root',
})
export class RadarDataItemConverterService {
	constructor() {}

	public fromDto(dto: RadarDataItemDto, number?: number): RadarDataItem {
		return {
			id: dto.id,
			name: dto.name,
			ring: dto.ring,
			sector: dto.sector,
			content: dto.content,
			number: number,
		};
	}
}
