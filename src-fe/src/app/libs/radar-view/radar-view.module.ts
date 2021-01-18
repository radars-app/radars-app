import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadarViewComponent } from './radar-view.component';
import { RadarViewRoutingModule } from './radar-view-routing.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { RadarChartLegendComponent } from './components/radar-chart-legend/radar-chart-legend.component';
import { RadarViewStoreModule } from './store/store.module';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { ZoomInOutPanelComponent } from './components/zoom-in-out-panel/zoom-in-out-panel.component';
import { DotTooltipComponent } from './components/dot-tooltip/dot-tooltip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditRadarPageComponent } from './components/edit-radar-page/edit-radar-page.component';
import { RadarEditorModule } from '../radar-editor/radar-editor.module';
import { CreateRadarPageComponent } from './components/create-radar-page/create-radar-page.component';
import { DeleteRadarConfirmationDialogComponent } from './components/delete-radar-confirmation-dialog/delete-radar-confirmation-dialog.component';

@NgModule({
	declarations: [
		RadarViewComponent,
		SideNavigationComponent,
		RadarChartLegendComponent,
		RadarChartComponent,
		ZoomInOutPanelComponent,
		DotTooltipComponent,
		EditRadarPageComponent,
		CreateRadarPageComponent,
		DeleteRadarConfirmationDialogComponent,
	],
	imports: [
		CommonComponentsModule,
		CommonModule,
		RadarViewStoreModule,
		ReactiveFormsModule,
		FormsModule,
		RadarViewRoutingModule,
		RadarEditorModule,
	],
	exports: [RadarViewRoutingModule],
})
export class RadarViewModule {}
