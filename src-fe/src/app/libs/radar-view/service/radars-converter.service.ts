import { Injectable } from '@angular/core';
import { RadarEntity, RadarEntityDto } from '../model/radar-entity.model';

@Injectable({
	providedIn: 'root',
})
export class RadarsConverterService {
	constructor() {}

	public fromDto(dto: RadarEntityDto[]): RadarEntity[] {
		return dto.map((entity: RadarEntityDto) => ({
			id: entity.radarId,
			name: entity.name,
			lastUpdatedDate: entity.lastUpdatedDate,
			config: entity.config,
		}));
	}
}
