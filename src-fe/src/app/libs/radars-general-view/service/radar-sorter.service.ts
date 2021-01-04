import { Injectable } from '@angular/core';
import { RadarWithData } from '../model/radar-with-data';

@Injectable({
	providedIn: 'root',
})
export class RadarSorterService {
	constructor() {}

	public sortByDate(radarWithData: RadarWithData[], isNewestToOldest: boolean): RadarWithData[] {
		return radarWithData.slice().sort((a: RadarWithData, b: RadarWithData): number => {
			const radarDataA: number = +a.lastUpdatedDate;
			const radarDateB: number = +b.lastUpdatedDate;
			if (isNewestToOldest) {
				return radarDataA < radarDateB ? 1 : -1;
			} else {
				return radarDataA > radarDateB ? 1 : -1;
			}
		});
	}

	public sortAlphabetical(radarWithData: RadarWithData[], isAtoZ: boolean): RadarWithData[] {
		return radarWithData.slice().sort((a: RadarWithData, b: RadarWithData): number => {
			if (isAtoZ) {
				return a.name > b.name ? 1 : -1;
			} else {
				return a.name < b.name ? 1 : -1;
			}
		});
	}
}
