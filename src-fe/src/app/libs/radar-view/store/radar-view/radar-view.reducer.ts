import { EntityStatus } from 'src/app/libs/container/model/entity-status';
import { RadarViewActions, RadarViewActionTypes, LoadRadarConfigSuccess } from './radar-view.actions';
import { RadarViewState } from './radar-view.state';

export const initialState: RadarViewState = {
	radarConfig: {
		value: null,
		status: EntityStatus.Init,
	},
};

export function radarViewReducer(state: RadarViewState = initialState, action: RadarViewActions): RadarViewState {
	switch (action.type) {
		case RadarViewActionTypes.LoadRadarConfig: {
			return {
				...state,
				radarConfig: {
					...state.radarConfig,
					status: EntityStatus.Pending,
				},
			};
		}

		case RadarViewActionTypes.LoadRadarConfigSuccess: {
			return {
				...state,
				radarConfig: {
					...state.radarConfig,
					value: (action as LoadRadarConfigSuccess).payload,
					status: EntityStatus.Success,
				},
			};
		}

		default:
			return state;
	}
}
