import { EntityWrapper } from 'src/app/libs/container/model/entity-wrapper';
import { RadarEntity } from '../../model/radar-entity.model';

export interface RadarViewState {
	radars: EntityWrapper<RadarEntity[]>;
}
