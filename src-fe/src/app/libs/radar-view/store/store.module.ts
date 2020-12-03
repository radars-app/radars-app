import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RadarViewEffects } from './radar-view/radar-view.effects';
import { radarViewReducer } from './radar-view/radar-view.reducer';

export const radarViewFeatureKey: string = 'radar-view';

@NgModule({
	imports: [EffectsModule.forFeature([RadarViewEffects]), StoreModule.forFeature(radarViewFeatureKey, radarViewReducer)],
})
export class RadarViewStoreModule {}
