import { Injectable } from '@angular/core';
import { RadarEntity, RadarEntityDto } from '../model/radar-entity.model';

@Injectable({
	providedIn: 'root',
})
export class RadarsConverterService {
	constructor() {}

	public fromDto(dto: RadarEntityDto): RadarEntity {
		return {
			id: dto.radarId,
			name: dto.name,
			lastUpdatedDate: new Date(dto.lastUpdatedDate),
			config: dto.config,
		};
	}
}
