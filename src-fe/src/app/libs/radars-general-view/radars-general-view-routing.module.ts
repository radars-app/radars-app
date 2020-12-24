import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RadarsGeneralViewComponent } from './radars-general-view.component';

const routes: Routes = [{ path: '', component: RadarsGeneralViewComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class RadarsGeneralViewRoutingModule {}
