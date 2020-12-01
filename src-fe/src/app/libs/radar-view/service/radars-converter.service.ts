import { Injectable } from '@angular/core';
import { RadarEntity, RadarEntityDto } from '../model/radar-entity.model';

@Injectable({
	providedIn: 'root',
})
export class RadarsConverterService {
	constructor() {}

	public fromDto(dto: RadarEntityDto[]): RadarEntity[] {
		console.log('RadarEntityDto', dto);
		return dto.map((entity: RadarEntityDto) => ({
			id: entity.id,
			name: entity.name,
			lastUpdatedDate: entity.lastUpdatedDate,
			config: entity.config,
		}));
	}
}
