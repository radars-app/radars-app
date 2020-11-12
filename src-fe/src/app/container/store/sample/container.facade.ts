import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ContainerState } from './sample.reducer';
import * as ContainerSelectors from './sample.selectors';
import * as ContainerActions from './sample.actions';

@Injectable({
  providedIn: 'root',
})
export class ContainerFacadeService {
  constructor(
	private store: Store<ContainerState>,
  ) { }

  get selectUserPhotoURL$(): Observable<string> {
	return this.store.pipe(select(ContainerSelectors.selectUserPhotoURL));
  }

  get selectUserProfile$(): Observable<any> {
	return this.store.pipe(select(ContainerSelectors.selectUserProfile));
  }

  get selectAppTheme$(): Observable<string> {
	return this.store.pipe(select(ContainerSelectors.selectTheme));
  }

  loadUserPhoto(): void {
	this.store.dispatch(new ContainerActions.GetUserPhoto({ data: '' }));
  }

  loadUserInfo(): void {
	this.store.dispatch(new ContainerActions.GetUserInfo({ data: ''}));
  }

}
