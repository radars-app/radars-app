import { ComponentTheme } from 'src/app/libs/common-components/common/enum/component-theme.enum';
import { EntityWrapper } from '../../model/entity-wrapper';
import { UserProfile } from '../../model/user-profile';

export interface ContainerState {
	theme: ComponentTheme;
	userProfile: EntityWrapper<UserProfile>;
	userPhotoBase64: EntityWrapper<string>;
}
