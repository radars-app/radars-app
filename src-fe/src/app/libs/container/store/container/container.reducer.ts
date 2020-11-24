import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { EntityStatus } from '../../model/entity-status';
import { ContainerActions, ContainerActionTypes, LoadUserPhotoSuccess, LoadUserProfileSuccess, SetTheme } from './container.actions';
import { ContainerState } from './container.state';

export const initialState: ContainerState = {
	theme: ComponentTheme.Light,
	userProfile: {
		value: null,
		status: EntityStatus.Init,
	},
	userPhotoBase64: {
		value: '../../../../assets/profile.svg',
		status: EntityStatus.Init,
	},
};

export function containerReducer(state: ContainerState = initialState, action: ContainerActions): ContainerState {
	switch (action.type) {
		case ContainerActionTypes.SetTheme: {
			return {
				...state,
				theme: (action as SetTheme).payload,
			};
		}

		case ContainerActionTypes.LoadUserPhoto: {
			return {
				...state,
				userPhotoBase64: {
					...state.userPhotoBase64,
					status: EntityStatus.Pending,
				},
			};
		}

		case ContainerActionTypes.LoadUserPhotoSuccess: {
			return {
				...state,
				userPhotoBase64: {
					...state.userPhotoBase64,
					value: (action as LoadUserPhotoSuccess).payload,
					status: EntityStatus.Success,
				},
			};
		}

		case ContainerActionTypes.LoadUserProfile: {
			return {
				...state,
				userProfile: {
					...state.userProfile,
					status: EntityStatus.Pending,
				},
			};
		}

		case ContainerActionTypes.LoadUserProfileSuccess: {
			return {
				...state,
				userProfile: {
					...state.userProfile,
					value: (action as LoadUserProfileSuccess).payload,
					status: EntityStatus.Success,
				},
			};
		}

		default:
			return state;
	}
}
