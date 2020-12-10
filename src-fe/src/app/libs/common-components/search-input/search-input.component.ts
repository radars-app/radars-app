import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { RadarDataItem } from '../../radar-view/model/radar-data-item';

import { ComponentTheme } from '../common/enum/component-theme.enum';
import { InputComponent } from '../input/input.component';

@Component({
	selector: 'app-search-input',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
	/* 	@ViewChild('searchInput', { static: true })
	public readonly searchInput: InputComponent; */

	@Input() public theme: ComponentTheme;

	@Input() public label: string;

	@Input() public placeholder: string;

	@Input() public preIcon: string;

	@Input() public foundItems$: Subject<RadarDataItem[]>;

	@Output() public valueChange$: Subject<string> = new Subject();

	public value: string;

	public setValue(eventString: string): void {
		console.log('search input', eventString);
		this.value = eventString.trim();
	}

	public setInnerValue(value: string): void {
		console.log('setInnerValue', value);
		// this.searchInput.onValueInput(value);
	}

	myControl = new FormControl();
	filteredOptions: Observable<string[]>;

	ngOnInit() {
		this.filteredOptions = this.myControl.valueChanges.pipe(
			startWith(''),
			tap((value) => this.valueChange$.next(value)),
			switchMap((value) => this._filter(value))
		);
	}

	private _filter(value: string): Observable<string[]> {
		const filterValue = value.toLowerCase();

		return this.foundItems$.pipe(
			map((items: RadarDataItem[]) =>
				items
					.filter((item: RadarDataItem) => item.name?.toLowerCase().includes(filterValue))
					.map((item: RadarDataItem) => item.name)
			)
		);
	}
}
