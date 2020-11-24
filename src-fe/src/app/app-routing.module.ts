import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ContainerComponent } from './libs/container/container.component';

const routes: Routes = [
	{
		path: 'example',
		component: ContainerComponent,
		canActivate: [MsalGuard],
	},
	{
		path: 'radars',
		loadChildren: () =>
			import('./libs/radar-view/radar-view.module').then(
				(m: typeof import('./libs/radar-view/radar-view.module')) => m.RadarViewModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: false })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
