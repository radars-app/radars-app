import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadarViewComponent } from './radar-view.component';
import { RadarViewRoutingModule } from './radar-view-routing.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';

@NgModule({
	declarations: [RadarViewComponent, EditDialogComponent],
	imports: [CommonComponentsModule, CommonModule],
	exports: [RadarViewRoutingModule],
})
export class RadarViewModule {}
