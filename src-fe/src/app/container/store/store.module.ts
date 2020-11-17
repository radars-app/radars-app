import { containerFeatureKey, reducer } from './sample/container.reducer';
import { SampleEffects } from './sample/container.effects';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

@NgModule({
	imports: [
		EffectsModule.forFeature([SampleEffects]),
		StoreModule.forFeature(containerFeatureKey, reducer),
	]
})
export class ContainerStoreModule { }
