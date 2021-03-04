import { EntityWrapper } from 'src/app/libs/container/model/entity-wrapper';
import { Radar } from 'src/app/libs/radar-view/model/radar';

export interface RadarsGeneralViewState {
	radarsWithData: EntityWrapper<Radar[]>;
}
