import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Radar } from '../../radar-view/model/radar';

import { LoadRadarsWithData } from '../store/radars-general-view/radars-general-view.actions';
import { selectRadarsWithData } from '../store/radars-general-view/radars-general-view.selectors';
import { RadarsGeneralViewState } from '../store/radars-general-view/radars-general-view.state';

@Injectable({
	providedIn: 'root',
})
export class RadarsGeneralViewFacadeService {
	constructor(private store: Store<RadarsGeneralViewState>) {}

	public get radars$(): Observable<Radar[]> {
		return this.store.pipe(select(selectRadarsWithData));
	}

	public loadRadars(): void {
		this.store.dispatch(new LoadRadarsWithData());
	}
}
