import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RadarEntity } from '../model/radar-entity.model';
import { LoadRadars } from '../store/radar-view/radar-view.actions';
import { selectActiveRadars } from '../store/radar-view/radar-view.selectors';
import { RadarViewState } from '../store/radar-view/radar-view.state';

@Injectable({
	providedIn: 'root',
})
export class RadarViewFacadeService {
	constructor(private store: Store<RadarViewState>) {}

	public get activeRadars$(): Observable<RadarEntity[]> {
		return this.store.pipe(select(selectActiveRadars));
	}

	public downloadRadars(id: string): void {
		this.store.dispatch(new LoadRadars(id));
	}
}
