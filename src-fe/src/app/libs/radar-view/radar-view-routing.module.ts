import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RadarViewComponent } from './radar-view.component';

const routes: Routes = [{ path: ':id', component: RadarViewComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class RadarViewRoutingModule {}
