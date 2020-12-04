import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Radar } from '../model/radar';
import { RadarDataItem } from '../model/radar-data-item';
import { LoadRadarDataItems, LoadRadars, UploadRadar } from '../store/radar-view/radar-view.actions';
import { selectRadarDataItems, selectRadars } from '../store/radar-view/radar-view.selectors';
import { RadarViewState } from '../store/radar-view/radar-view.state';
import { RadarConfig } from '../model/radar-config';

@Injectable({
	providedIn: 'root',
})
export class RadarViewFacadeService {
	constructor(private store: Store<RadarViewState>) {}

	public get radars$(): Observable<Radar[]> {
		return this.store.pipe(select(selectRadars));
	}

	public get radarDataItems$(): Observable<RadarDataItem[]> {
		return this.store.pipe(select(selectRadarDataItems));
	}

	public loadRadars(id: string): void {
		this.store.dispatch(new LoadRadars(id));
	}

	public loadRadarDataItems(radarId: string): void {
		this.store.dispatch(new LoadRadarDataItems(radarId));
	}

	public uploadRadar(radarId: string, radarConfig: RadarConfig): void {
		this.store.dispatch(new UploadRadar({ radarId, radarConfig }));
	}
}
