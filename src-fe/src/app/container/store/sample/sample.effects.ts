import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of, Observable } from 'rxjs';
import { LoadSamplesFailure, LoadSamplesSuccess, SampleActionTypes, SampleActions } from './sample.actions';

@Injectable()
export class SampleEffects {

	constructor(private actions$: Actions<SampleActions>) { }

}
