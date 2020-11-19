import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ContainerEffects } from './container/container.effects';
import { containerReducer } from './container/container.reducer';

export const containerFeatureKey: string = 'container';

@NgModule({
	imports: [EffectsModule.forFeature([ContainerEffects]), StoreModule.forFeature(containerFeatureKey, containerReducer)],
})
export class ContainerStoreModule {}
