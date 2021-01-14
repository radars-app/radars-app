import { NgModule } from '@angular/core';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { RadarEditorComponent } from './radar-editor.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrepareRadarComponent } from './components/prepare-radar/prepare-radar.component';
import { RadarEditorNavigationComponent } from './components/radar-editor-navigation/radar-editor-navigation.component';

@NgModule({
	declarations: [PrepareRadarComponent, RadarEditorNavigationComponent, RadarEditorComponent],
	imports: [CommonComponentsModule, CommonModule, RouterModule],
	exports: [RadarEditorComponent],
})
export class RadarEditorModule {}
