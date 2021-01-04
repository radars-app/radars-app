import { EntityWrapper } from 'src/app/libs/container/model/entity-wrapper';
import { RadarWithData } from '../../model/radar-with-data';

export interface RadarsGeneralViewState {
	radarsWithData: EntityWrapper<RadarWithData[]>;
}
