import { EntityWrapper } from 'src/app/libs/container/model/entity-wrapper';
import { Radar } from '../../model/radar';
import { RadarDataItem } from '../../model/radar-data-item';

export interface RadarViewState {
	radars: EntityWrapper<Radar[]>;
	radarDataItems: EntityWrapper<RadarDataItem[]>;
	searchQuery: string;
	filteredRadarDataItems: RadarDataItem[];
}
