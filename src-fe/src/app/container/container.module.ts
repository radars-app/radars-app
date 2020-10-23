import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerStoreModule } from './store/store.module';
import { ContainerComponent } from './container.component';

@NgModule({
	declarations: [
		ContainerComponent
	],
	imports: [
		CommonModule,
		ContainerStoreModule
	],
	exports: [
		ContainerComponent
	]
})
export class ContainerModule { }
