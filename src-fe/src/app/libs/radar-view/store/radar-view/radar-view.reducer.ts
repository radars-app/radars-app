import { EntityStatus } from 'src/app/libs/container/model/entity-status';
import { RadarViewActions, RadarViewActionTypes, LoadRadarsSuccess } from './radar-view.actions';
import { RadarViewState } from './radar-view.state';

export const initialState: RadarViewState = {
	radars: {
		value: null,
		status: EntityStatus.Init,
	},
};

export function radarViewReducer(state: RadarViewState = initialState, action: RadarViewActions): RadarViewState {
	switch (action.type) {
		case RadarViewActionTypes.LoadRadars: {
			return {
				...state,
				radars: {
					...state.radars,
					status: EntityStatus.Pending,
				},
			};
		}

		case RadarViewActionTypes.LoadRadarsSuccess: {
			return {
				...state,
				radars: {
					...state.radars,
					value: (action as LoadRadarsSuccess).payload,
					status: EntityStatus.Success,
				},
			};
		}

		default:
			return state;
	}
}
