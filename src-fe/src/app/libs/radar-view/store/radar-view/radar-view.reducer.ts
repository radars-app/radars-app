import { EntityStatus } from 'src/app/libs/container/model/entity-status';
import {
	RadarViewActions,
	RadarViewActionTypes,
	LoadRadarSuccess,
	SetSearchQuery,
	SetFilteredRadarItems,
	RefreshCsv,
} from './radar-view.actions';
import { RadarViewState } from './radar-view.state';

export const initialState: RadarViewState = {
	radar: {
		value: null,
		status: EntityStatus.Init,
	},
	searchQuery: null,
	filteredRadarDataItems: null,
};

export function radarViewReducer(state: RadarViewState = initialState, action: RadarViewActions): RadarViewState {
	switch (action.type) {
		case RadarViewActionTypes.LoadRadar: {
			return {
				...state,
				radar: {
					...state.radar,
					status: EntityStatus.Pending,
				},
			};
		}

		case RadarViewActionTypes.LoadRadarSuccess: {
			return {
				...state,
				radar: {
					...state.radar,
					value: (action as LoadRadarSuccess).payload,
					status: EntityStatus.Success,
				},
			};
		}

		case RadarViewActionTypes.SetSearchQuery: {
			return {
				...state,
				searchQuery: (action as SetSearchQuery).payload,
			};
		}

		case RadarViewActionTypes.RefreshCsv: {
			return {
				...state,
				radar: {
					...state.radar,
					value: {
						...state.radar.value,
						csv: (action as RefreshCsv).payload,
					},
				},
			};
		}

		case RadarViewActionTypes.SetFilteredRadarItems: {
			return {
				...state,
				filteredRadarDataItems: (action as SetFilteredRadarItems).payload,
			};
		}

		default:
			return state;
	}
}
