import { EntityStatus } from 'src/app/libs/container/model/entity-status';
import { RadarsGeneralViewActions, RadarsGeneralViewActionTypes, LoadRadarsWithDataSuccess } from './radars-general-view.actions';
import { RadarsGeneralViewState as GeneralViewState } from './radars-general-view.state';

export const initialState: GeneralViewState = {
	radarsWithData: {
		value: null,
		status: EntityStatus.Init,
	},
};

export function radarsGeneralViewReducer(state: GeneralViewState = initialState, action: RadarsGeneralViewActions): GeneralViewState {
	switch (action.type) {
		case RadarsGeneralViewActionTypes.LoadRadarsWithData: {
			return {
				...state,
				radarsWithData: {
					value: [],
					status: EntityStatus.Pending,
				},
			};
		}

		case RadarsGeneralViewActionTypes.LoadRadarsWithDataSuccess: {
			return {
				...state,
				radarsWithData: {
					value: (action as LoadRadarsWithDataSuccess).payload,
					status: EntityStatus.Success,
				},
			};
		}

		default:
			return state;
	}
}
