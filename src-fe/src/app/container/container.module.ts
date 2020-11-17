import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { ContainerStoreModule } from './store/store.module';
import { ContainerComponent } from './container.component';
import { GlobalHeaderComponent } from './components/global-header/global-header.component';
import { ProfilePopupComponent } from './components/profile-popup/profile-popup.component';
import { MatCardModule } from '@angular/material/card';
import { CommonComponentsModule } from './components/common-components/common-components.module';

@NgModule({
	declarations: [ContainerComponent, GlobalHeaderComponent, ProfilePopupComponent],
	imports: [
		CommonModule,
		ContainerStoreModule,
		RouterModule,
		MatSlideToggleModule,
		MatButtonModule,
		MatDividerModule,
		MatCardModule,
		CommonComponentsModule,
	],
	exports: [ContainerComponent, GlobalHeaderComponent],
})
export class ContainerModule {}
