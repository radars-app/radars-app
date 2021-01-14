import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditRadarPageComponent } from './components/edit-radar-page/edit-radar-page.component';
import { RadarViewComponent } from './radar-view.component';

const routes: Routes = [
	{
		path: ':id',
		component: RadarViewComponent,
	},
	{
		path: ':id/edit',
		component: EditRadarPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RadarViewRoutingModule {}
