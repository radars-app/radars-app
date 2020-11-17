
import { ComponentTheme } from '../../../../shared/component-theme.enum';
import { SampleActions, SampleActionTypes } from './container.actions';

export const containerFeatureKey: string = 'container';

export interface ContainerState {
	theme: ComponentTheme;
	userProfile: any;
	userPhoto: string;
}

export const initialState: ContainerState = {
	theme: ComponentTheme.Light,
	userProfile: null,
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
			return {
				...state,
				userProfile: action.payload.data,
			};
		default:
			return state;
	}
}
