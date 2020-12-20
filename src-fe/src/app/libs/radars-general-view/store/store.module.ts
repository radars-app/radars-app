import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RadarsGeneralViewEffects } from './radars-general-view/radars-general-view.effects';
import { radarsGeneralViewReducer } from './radars-general-view/radars-general-view.reducer';

export const radarsGeneralViewFeatureKey: string = 'radars-general-view';

@NgModule({
	imports: [
		EffectsModule.forFeature([RadarsGeneralViewEffects]),
		StoreModule.forFeature(radarsGeneralViewFeatureKey, radarsGeneralViewReducer),
	],
})
export class RadarsGeneralViewStoreModule {}
