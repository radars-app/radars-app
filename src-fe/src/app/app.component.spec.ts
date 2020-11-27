import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { HttpClientModule } from '@angular/common/http';
import { ContainerModule } from './libs/container/container.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, HttpClientModule, ContainerModule, EffectsModule.forRoot([]), StoreModule.forRoot({})],
			declarations: [AppComponent],
			providers: [
				{
					provide: MsalService,
					useValue: {},
				},
				{
					provide: BroadcastService,
					useValue: {},
				},
			],
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
		const app: AppComponent = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});
});
