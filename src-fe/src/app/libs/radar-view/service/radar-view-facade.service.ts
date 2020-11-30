import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadRadarConfig } from '../store/radar-view/radar-view.actions';
import { RadarViewState } from '../store/radar-view/radar-view.state';

@Injectable({
	providedIn: 'root',
})
export class RadarViewFacadeService {
	constructor(private store: Store<RadarViewState>) {}

	public downloadRadarConfigFile(ID: string): void {
		this.store.dispatch(new LoadRadarConfig(ID));
	}
}
