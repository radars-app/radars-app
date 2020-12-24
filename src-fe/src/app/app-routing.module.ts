import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'radars',
		loadChildren: () =>
			import('./libs/radar-view/radar-view.module').then(
				(m: typeof import('./libs/radar-view/radar-view.module')) => m.RadarViewModule
			),
	},
	{
		path: '',
		loadChildren: () =>
			import('./libs/radars-general-view/radars-general-view.module').then(
				(m: typeof import('./libs/radars-general-view/radars-general-view.module')) => m.RadarsGeneralViewModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: false })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
