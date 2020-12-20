import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonComponentsModule } from '../common-components/common-components.module';
import { RadarsGeneralViewComponent } from './radars-general-view.component';
import { RadarsGeneralViewRoutingModule } from './radars-general-view-routing.module';
import { RadarsGeneralViewStoreModule } from './store/store.module';

@NgModule({
	declarations: [RadarsGeneralViewComponent],
	imports: [CommonModule, CommonComponentsModule, RadarsGeneralViewRoutingModule, RadarsGeneralViewStoreModule],
	exports: [RadarsGeneralViewComponent],
})
export class RadarsGeneralViewModule {}
