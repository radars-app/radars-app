import { containerFeatureKey, reducer } from './sample/container.reducer';
import { ContainerEffects } from './sample/container.effects';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

@NgModule({
	imports: [EffectsModule.forFeature([ContainerEffects]), StoreModule.forFeature(containerFeatureKey, reducer)],
})
export class ContainerStoreModule {}
