import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadarViewComponent } from './radar-view.component';
import { RadarViewRoutingModule } from './radar-view-routing.module';
import { CommonComponentsModule } from '../common-components/common-components.module';

@NgModule({
	declarations: [RadarViewComponent],
	imports: [CommonComponentsModule, CommonModule],
	exports: [RadarViewRoutingModule],
})
export class RadarViewModule {}
