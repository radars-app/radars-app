import { Injectable } from '@angular/core';
import { Radar, RadarDto } from '../model/radar';

@Injectable({
	providedIn: 'root',
})
export class RadarConverterService {
	constructor() {}

	public fromDto(dto: RadarDto): Radar {
		return {
			id: dto.radarId,
			name: dto.name,
			lastUpdatedDate: new Date(dto.lastUpdatedDate),
			config: dto.config,
		};
	}
}
