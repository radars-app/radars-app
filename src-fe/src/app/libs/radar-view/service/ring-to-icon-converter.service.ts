import { Injectable } from '@angular/core';
import { filter } from 'rxjs/internal/operators/filter';
import { Radar } from '../model/radar';
import { Ring } from '../model/ring';
import { RadarViewFacadeService } from './radar-view-facade.service';

@Injectable({
	providedIn: 'root',
})
export class RingToIconConverterService {
	private rings: Ring[];

	constructor(private radarViewFacade: RadarViewFacadeService) {
		this.rings = [];
		this.radarViewFacade.radar$.pipe(filter((radar: Radar) => Boolean(radar))).subscribe((radar: Radar) => {
			this.rings = radar.rings;
		});
	}

	public getIconClassByRing(ring: Ring): string {
		const isFirstRing: boolean = this.rings[0].uid === ring.uid;
		return isFirstRing ? 'ring_legend_base' : 'ring_legend';
	}
}
