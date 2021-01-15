import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Radar } from '../model/radar';
import { RadarDataItem } from '../model/radar-data-item';
import { LoadRadarDataItems, LoadRadars, RemoveRadar, SetSearchQuery, UploadRadar } from '../store/radar-view/radar-view.actions';
import {
	selectFilteredRadarDataItems,
	selectRadarDataItems,
	selectRadars,
	selectSearchQuery,
} from '../store/radar-view/radar-view.selectors';
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

	public get searchQuery$(): Observable<string> {
		return this.store.pipe(select(selectSearchQuery));
	}

	public get filteredRadarDataItems$(): Observable<RadarDataItem[]> {
		return this.store.pipe(select(selectFilteredRadarDataItems));
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

	public searchRadarItems(searchQuery: string): void {
		this.store.dispatch(new SetSearchQuery(searchQuery));
	}

	public removeRadar(radarId: string): void {
		this.store.dispatch(new RemoveRadar(radarId));
	}
}
