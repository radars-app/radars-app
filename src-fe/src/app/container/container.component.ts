import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ContainerState } from './store/sample/sample.reducer';
import { selectUserPhotoURL } from '../container/store/sample/sample.selectors';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
	public userPhotoURL$ = this.store.select(selectUserPhotoURL);

	constructor(private store: Store<ContainerState>) { }

	ngOnInit(): void {
		this.userPhotoURL$.subscribe(x => { console.log('==========', x)});
	}

}
