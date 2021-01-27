import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { EntityStatus } from '../../model/entity-status';
import { ContainerActions, ContainerActionTypes, LoadUserProfileSuccess, SetTheme } from './container.actions';
import { ContainerState } from './container.state';

export const initialState: ContainerState = {
	theme: ComponentTheme.Light,
	userProfile: {
		value: null,
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
					value: (action as LoadUserProfileSuccess).payload,
					status: EntityStatus.Success,
				},
			};
		}

		default:
			return state;
	}
}
