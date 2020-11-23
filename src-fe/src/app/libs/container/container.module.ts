import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContainerStoreModule } from './store/store.module';
import { ContainerComponent } from './container.component';
import { GlobalHeaderComponent } from './components/global-header/global-header.component';
import { ProfilePopupComponent } from './components/profile-popup/profile-popup.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
	declarations: [ContainerComponent, GlobalHeaderComponent, ProfilePopupComponent, UserProfileComponent],
	imports: [CommonModule, ContainerStoreModule, RouterModule, CommonComponentsModule],
	exports: [ContainerComponent, GlobalHeaderComponent],
})
export class ContainerModule {}
