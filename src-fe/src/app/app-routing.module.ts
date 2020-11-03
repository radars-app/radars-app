import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ContainerComponent } from './container/container.component';

const routes: Routes = [
  {
	path: '',
	component: ContainerComponent,
	canActivate: [
		MsalGuard
	]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
