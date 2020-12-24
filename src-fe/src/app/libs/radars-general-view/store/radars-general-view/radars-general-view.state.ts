import { EntityWrapper } from 'src/app/libs/container/model/entity-wrapper';
import { Radar } from '../../../radar-view/model/radar';

export interface RadarsGeneralViewState {
	radars: EntityWrapper<Radar[]>;
}
