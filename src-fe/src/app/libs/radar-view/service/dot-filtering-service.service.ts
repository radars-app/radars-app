import { Injectable } from '@angular/core';
import { RadarDataItem } from '../model/radar-data-item';

@Injectable({
	providedIn: 'root',
})
export class DotFilteringServiceService {
	constructor() {}

	public filterDotsBySearchQuery(query: string, items: RadarDataItem[]): RadarDataItem[] {
		const preparedQuery: string = query.toLowerCase().trim();

		const filteredItems: RadarDataItem[] = items.filter((item: RadarDataItem) => {
			const foundInName: boolean = item.name.toLowerCase().includes(preparedQuery);
			const foundInContent: boolean = item.content.toLowerCase().includes(preparedQuery);
			return foundInName || foundInContent;
		});

		return filteredItems;
	}
}
