import { EntityStatus } from 'src/app/libs/container/model/entity-status';
import { RadarsGeneralViewActions, RadarsGeneralViewActionTypes, LoadAllLatestRadarsSuccess } from './radars-general-view.actions';
import { RadarsGeneralViewState as GeneralViewState } from './radars-general-view.state';

export const initialState: GeneralViewState = {
	radars: {
		value: null,
		status: EntityStatus.Init,
	},
};

export function radarsGeneralViewReducer(state: GeneralViewState = initialState, action: RadarsGeneralViewActions): GeneralViewState {
	switch (action.type) {
		case RadarsGeneralViewActionTypes.LoadAllLatestRadars: {
			return {
				...state,
				radars: {
					...state.radars,
					status: EntityStatus.Pending,
				},
			};
		}

		case RadarsGeneralViewActionTypes.LoadAllLatestRadarsSuccess: {
			return {
				...state,
				radars: {
					...state.radars,
					value: (action as LoadAllLatestRadarsSuccess).payload,
					status: EntityStatus.Success,
				},
			};
		}

		default:
			return state;
	}
}
