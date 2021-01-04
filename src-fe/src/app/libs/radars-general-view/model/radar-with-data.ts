import { Radar } from '../../radar-view/model/radar';
import { RadarDataItem, RadarDataItemDto } from '../../radar-view/model/radar-data-item';

export interface RadarWithData extends Radar {
	dataItems: RadarDataItemDto[];
}
