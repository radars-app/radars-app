import { EntityWrapper } from 'src/app/libs/container/model/entity-wrapper';
import { Radar } from '../../model/radar';
import { RadarDataItem } from '../../model/radar-data-item';

export interface RadarViewState {
	radar: EntityWrapper<Radar>;
	searchQuery: string;
	filteredRadarDataItems: RadarDataItem[];
}
