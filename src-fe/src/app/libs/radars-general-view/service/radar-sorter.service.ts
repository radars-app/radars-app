import { Injectable } from '@angular/core';
import { Radar } from '../../radar-view/model/radar';

@Injectable({
	providedIn: 'root',
})
export class RadarSorterService {
	constructor() {}

	public sortByDate(radarWithData: Radar[], isNewestToOldest: boolean): Radar[] {
		return radarWithData?.slice().sort((a: Radar, b: Radar): number => {
			const radarDataA: number = +a.lastUpdatedAt;
			const radarDateB: number = +b.lastUpdatedAt;
			if (isNewestToOldest) {
				return radarDataA < radarDateB ? 1 : -1;
			} else {
				return radarDataA > radarDateB ? 1 : -1;
			}
		});
	}

	public sortAlphabetical(radarWithData: Radar[], isAtoZ: boolean): Radar[] {
		return radarWithData?.slice().sort((a: Radar, b: Radar): number => {
			if (isAtoZ) {
				return a.name > b.name ? 1 : -1;
			} else {
				return a.name < b.name ? 1 : -1;
			}
		});
	}
}
