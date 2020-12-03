import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadarViewComponent } from './radar-view.component';
import { RadarViewRoutingModule } from './radar-view-routing.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { RadarChartLegendComponent } from './components/radar-chart-legend/radar-chart-legend.component';
import { RadarViewStoreModule } from './store/store.module';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { DragAndDropDirective } from './components/edit-dialog/drag-and-drop.directive';

@NgModule({
	declarations: [
		RadarViewComponent,
		EditDialogComponent,
		SideNavigationComponent,
		RadarChartLegendComponent,
		RadarChartComponent,
		DragAndDropDirective,
	],
	imports: [CommonComponentsModule, CommonModule, RadarViewStoreModule],
	exports: [RadarViewRoutingModule],
})
export class RadarViewModule {}
