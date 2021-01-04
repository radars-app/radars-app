import { Radar } from '../../radar-view/model/radar';
import { RadarDataItem } from '../../radar-view/model/radar-data-item';

export interface RadarWithData extends Radar {
	radarDataItems: RadarDataItem[];
}
