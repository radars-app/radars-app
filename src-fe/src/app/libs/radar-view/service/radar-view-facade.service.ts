import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityStatus } from '../../container/model/entity-status';
import { Radar } from '../model/radar';
import { RadarDataItem } from '../model/radar-data-item';
import { CreateRadar, LoadRadar, RefreshCsv, RemoveRadar, SetSearchQuery, UploadRadar } from '../store/radar-view/radar-view.actions';
import { selectFilteredRadarDataItems, selectRadar, selectRadarStatus, selectSearchQuery } from '../store/radar-view/radar-view.selectors';
import { RadarViewState } from '../store/radar-view/radar-view.state';

@Injectable({
	providedIn: 'root',
})
export class RadarViewFacadeService {
	constructor(private store: Store<RadarViewState>) {}

	public get radar$(): Observable<Radar> {
		return this.store.pipe(select(selectRadar));
	}

	public get radarStatus$(): Observable<EntityStatus> {
		return this.store.pipe(select(selectRadarStatus));
	}

	public get searchQuery$(): Observable<string> {
		return this.store.pipe(select(selectSearchQuery));
	}

	public get filteredRadarDataItems$(): Observable<RadarDataItem[]> {
		return this.store.pipe(select(selectFilteredRadarDataItems));
	}

	public loadRadar(id: string): void {
		this.store.dispatch(new LoadRadar(id));
	}

	public uploadRadar(radar: Radar): void {
		this.store.dispatch(new UploadRadar(radar));
	}

	public createRadar(radar: Radar): void {
		this.store.dispatch(new CreateRadar(radar));
	}

	public searchRadarItems(searchQuery: string): void {
		this.store.dispatch(new SetSearchQuery(searchQuery));
	}

	public removeRadar(radarId: string): void {
		this.store.dispatch(new RemoveRadar(radarId));
	}

	public refreshCsv(csv: string): void {
		this.store.dispatch(new RefreshCsv(csv));
	}
}
