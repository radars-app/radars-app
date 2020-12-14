import { Injectable } from '@angular/core';
import { filter } from 'rxjs/internal/operators/filter';
import { Radar } from '../model/radar';
import { RadarViewFacadeService } from './radar-view-facade.service';

@Injectable({
	providedIn: 'root',
})
export class RingToIconConverterService {
	private rings: string[];

	constructor(private radarViewFacade: RadarViewFacadeService) {
		this.rings = [];
		this.radarViewFacade.radars$.pipe(filter((radars: Radar[]) => Boolean(radars))).subscribe((radars: Radar[]) => {
			this.rings = radars[radars.length - 1].rings;
		});
	}

	public getIconClassByRing(ring: string): string {
		const isFirstRing: boolean = this.rings[0] === ring;
		return isFirstRing ? 'ring_legend_base' : 'ring_legend';
	}
}
