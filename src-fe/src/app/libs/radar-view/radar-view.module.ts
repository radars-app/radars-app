import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadarViewComponent } from './radar-view.component';
import { RadarViewRoutingModule } from './radar-view-routing.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';

@NgModule({
	declarations: [RadarViewComponent, EditDialogComponent, SideNavigationComponent],
	imports: [CommonComponentsModule, CommonModule],
	exports: [RadarViewRoutingModule],
})
export class RadarViewModule {}
