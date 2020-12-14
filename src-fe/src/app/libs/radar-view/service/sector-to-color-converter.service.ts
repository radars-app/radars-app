import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Radar } from '../model/radar';
import { SECTOR_COLORS } from '../model/sector-colors';
import { RadarViewFacadeService } from './radar-view-facade.service';

@Injectable({
	providedIn: 'root',
})
export class SectorToColorConverterService {
	private sectors: string[];

	constructor(private radarViewFacade: RadarViewFacadeService) {
		this.sectors = [];
		this.radarViewFacade.radars$.pipe(filter((radars: Radar[]) => Boolean(radars))).subscribe((radars: Radar[]) => {
			this.sectors = radars[radars.length - 1].sectors;
		});
	}

	public getColorBySector(sector: string): string {
		const sectorIndex: number = this.sectors.findIndex((radarSector: string) => radarSector === sector);
		return SECTOR_COLORS[sectorIndex];
	}
}
