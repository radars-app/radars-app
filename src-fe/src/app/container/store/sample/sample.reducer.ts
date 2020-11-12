
import { SampleActions, SampleActionTypes } from './sample.actions';

export const sampleFeatureKey: string = 'sample';

export interface ContainerState {
	theme: string;
	userPhoto: string;
}

export const initialState: ContainerState = {
	theme: 'light',
	userPhoto: '../../../../assets/profile.svg',
};

export function reducer(state: ContainerState = initialState, action: SampleActions): ContainerState {
	switch (action.type) {

		case SampleActionTypes.SetTheme:
			return {
				...state,
				theme: action.payload.data,
			};

		case SampleActionTypes.GetUserPhotoSuccess:
				return {
					...state,
					userPhoto: action.payload.data,
				};
		case SampleActionTypes.GetUserInfoSuccess:

		default:
			return state;
	}
}
