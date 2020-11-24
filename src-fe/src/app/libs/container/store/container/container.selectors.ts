import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { UserProfile } from '../../model/user-profile';
import { containerFeatureKey } from '../store.module';
import { ContainerState } from './container.state';

export const selectContainerState: MemoizedSelector<{}, ContainerState> = createFeatureSelector<ContainerState>(containerFeatureKey);

export const selectUserPhotoBase64: MemoizedSelector<ContainerState, string> = createSelector(
	selectContainerState,
	(state: ContainerState) => state.userPhotoBase64.value
);

export const selectUserProfile: MemoizedSelector<ContainerState, UserProfile> = createSelector(
	selectContainerState,
	(state: ContainerState) => state.userProfile.value
);

export const selectTheme: MemoizedSelector<ContainerState, ComponentTheme> = createSelector(
	selectContainerState,
	(state: ContainerState) => state.theme
);
